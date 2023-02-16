<script lang='ts'>
	import { Alert, Badge, Button, Card } from "flowbite-svelte";
  import { Replicate, Renew, TrashCan } from "carbon-icons-svelte";
  import type {Material} from '$models';
  export let material: Material;

</script>
<div class='--queue-item-detail-container px-5 py-1'>
  <Card>
    <p>
      <span style='color: #{material.color}' class='color-indicator'>&#9632;</span>
      <Badge large color='dark'>{material.materialType}</Badge> 
      {material.vendor} 
      <span class='float-right'>TODO%</span> <!-- Material Remaining -->
    </p>
    <!-- Warnings -->
      <!-- Exposure Warning -->
      <Alert color='yellow'>
        <span class="font-medium">Warning!</span> This material's logs show it has been exposed for over 6 months.
        <emphasis>It is recommended that this material goes through the drying process before use to reduce printing issues</emphasis>
      </Alert>
      <!-- Less than avg job use remaining -->
      <Alert color='yellow'>
        <span class="font-medium">Warning!</span> The estimated remaing material is less than your average print use, consider replacing this material if used in a printer without a runout sensors
      </Alert>
      <!-- Excessive Failures -->
      <Alert color='red'>
        <span class="font-medium">Danger!</span> Logs indicate a large number of failures with this material, consider replacement or drying as needed.
      </Alert>
    <!-- Operations -->
      <!-- Open --> <!-- TODO: Change Icon --> 
      <Button color='blue'><Renew class='mx-1' />Open</Button>
      <!-- Renew: Dry, reprocess, etc... -->
      <Button color='blue'><Renew class='mx-1' />Renew</Button>
      <!-- Duplicate to new spool -->
      <Button color='dark'><Replicate class='mx-1' />Duplicate</Button>
      <Button color='red'><TrashCan class='mx-1' />Discard</Button>
  </Card>
</div>