<script lang='ts'>
  import type { PageData } from './$types';
  
  export let data: PageData;
  console.debug('data', data.update_status.result);
</script>

<div>
  <div>
    <strong>Klipper:</strong> {data.update_status.result.version_info.klipper.version} / {data.update_status.result.version_info.klipper.remote_version} 
  </div>
</div>