import type {
  AdapterFunction,
  LuciaErrorConstructor,
  SessionAdapter,
  SessionSchema
} from 'lucia-auth';
import { UniqueConstraintError } from 'sequelize';
import { Session } from '$models';

const adapter =
  (): AdapterFunction<SessionAdapter> => (LuciaErrorConstructor: LuciaErrorConstructor) => {
    return {
      deleteSession: async (sessionId: string): Promise<void> => {
        Session.destroy({ where: { id: sessionId } });
      },
      deleteSessionsByUserId: async (userId: string): Promise<void> => {
        Session.destroy({ where: { user_id: userId } });
      },
      getSession: async (sessionId: string): Promise<SessionSchema | null> => {
        return Session.findByPk(sessionId);
      },
      getSessionsByUserId: async (userId: string): Promise<SessionSchema[]> => {
        return Session.findAll({ where: { user_id: userId } });
      },
      setSession: async (session: SessionSchema): Promise<void> => {
        if (typeof session.active_expires === 'bigint')
          session.active_expires = Number(session.active_expires);
        if (typeof session.idle_expires === 'bigint')
          session.idle_expires = Number(session.idle_expires);
        session.idle_expires = Number(session.idle_expires);
        Session.create({
          ...(session as Overwrite<SessionSchema, { active_expires: number; idle_expires: number }>)
        }).catch((error) => {
          console.error(error);
          if (error instanceof UniqueConstraintError) {
            throw new LuciaErrorConstructor('AUTH_DUPLICATE_SESSION_ID');
          }
          throw error;
        });
      }
    };
  };

export { adapter as SessionAdapter };
