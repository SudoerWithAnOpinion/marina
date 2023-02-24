<script lang='ts'>

  /**
   * checkAddress
   * 
   * Checks an address by placing a request to the backend to look 
   * for a printer (in case the user is using marina remotely).
   * @param address
   * @throws {Error} 
   */
  const checkAddress = async (address:string):Promise<boolean> => {
    
  }
  const checkAuth = async (address:string, apiKey:string|null = null) => {
    // Check if the address connects to a moonraker instance
    if (await checkAddress(address)){

    }else{
      throw new Error(`No moonraker connection could be established`);
    }
  }
</script>


<div>
  Printer Name:
  Description:
  Address:
  API Key (Check Printer if it's needed):
  Volume (Check Printer for volume automatically): 
</div>