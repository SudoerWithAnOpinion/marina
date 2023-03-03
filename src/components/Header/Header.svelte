<script lang='ts'>
  import { env } from '$env/dynamic/public';
  import { goto } from '$app/navigation';
  import { 
    Header, 
    HeaderNav, 
    HeaderNavItem,
    HeaderNavMenu,
    HeaderUtilities,
    HeaderAction,
    HeaderGlobalAction,
    HeaderPanelDivider,
    HeaderPanelLinks,
    HeaderPanelLink,
    SkipToContent,
    SideNav,
    SideNavItems,
    SideNavLink,
    SideNavMenu,
    SideNavMenuItem,
    SideNavDivider,
  } from 'carbon-components-svelte';
  import { expoIn } from "svelte/easing";
  import Fade from 'carbon-icons-svelte/lib/Fade.svelte';
  import { 
    AddFilled, 
    CircleDash, 
    Login, 
    User, 
    UserAvatarFilledAlt, 
  } from 'carbon-icons-svelte';
  import type Printer from '$models/Printers/Printer';
  import type UserModel from '$models/Users/User';
  const genLink = (path: string): string => {
    return ((env.PUBLIC_BASE_PATH ?? '') + path).replace('//', '/');
  }
  const appTransition = { duration: 600, delay: 50, easing: expoIn };

  
  // export let isSideNavOpen = false;

  export const printers: Printer[] = [];
  export let printerName = 'Global';
  export let user: UserModel | null = null;
  $: user;
  
</script>

<Header company='Marina: ' platformName={printerName} > <!-- bind:isSideNavOpen -->
  <svelte:fragment slot='skip-to-content'>
    <SkipToContent />
  </svelte:fragment>
  <HeaderNav>
    <HeaderNavItem href={genLink('/printers')} text="Printers" />
    <HeaderNavItem href={genLink('/jobs')} text="Jobs" />
    <HeaderNavItem href={genLink('/users')} text="Users" />
    <!-- <HeaderNavMenu text="Menu">
      <HeaderNavItem href="/" text="Link 1" />
      <HeaderNavItem href="/" text="Link 2" />
      <HeaderNavItem href="/" text="Link 3" />
    </HeaderNavMenu> -->
    <!-- <HeaderNavItem href="#" text="Login" on:click={openSideNav()} /> -->
    <!-- <HeaderNavItem></HeaderNavItem> -->
  </HeaderNav>

  <HeaderUtilities>
    {#if user !== null}
      <HeaderAction aria-label="User" 
        icon={UserAvatarFilledAlt}
        closeIcon={UserAvatarFilledAlt}
        transition={appTransition}
      >
        <HeaderPanelLinks>
          <HeaderPanelLink>Logout</HeaderPanelLink>
        </HeaderPanelLinks>
      </HeaderAction>
    {:else}
      <HeaderGlobalAction aria-label="Login" icon={Login} on:click={()=>{goto(genLink('/auth/login'))}} />
    {/if}
    <HeaderAction transition={appTransition}>
      <HeaderPanelLinks>
        <HeaderPanelDivider>Printers</HeaderPanelDivider>
        {#each printers as printer}
          <HeaderPanelLink href={genLink(`/printer/${printer.printerId}`)}>{printer.name}</HeaderPanelLink>
        {:else}
          <HeaderPanelLink disabled={true}><CircleDash class='inline' /> (No Printers)</HeaderPanelLink>  
        {/each}
        <HeaderPanelLink><AddFilled class='inline' /> Add Printer
        </HeaderPanelLink>

      </HeaderPanelLinks>
    </HeaderAction>
  </HeaderUtilities>

</Header>

<!-- <SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    <SideNavLink icon={Fade} text="Link 1" href="/" isSelected />
    <SideNavLink icon={Fade} text="Link 2" href="/" />
    <SideNavLink icon={Fade} text="Link 3" href="/" />
    <SideNavMenu icon={Fade} text="Menu">
      <SideNavMenuItem href="/" text="Link 1" />
      <SideNavMenuItem href="/" text="Link 2" />
      <SideNavMenuItem href="/" text="Link 3" />
    </SideNavMenu>
    <SideNavDivider />
    <SideNavLink icon={Fade} text="Link 4" href="/" />
  </SideNavItems>
</SideNav> -->