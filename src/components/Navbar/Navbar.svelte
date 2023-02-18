<script lang='ts'>
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte'
</script>

<Navbar let:hidden let:toggle class="bg-slate-500">
  <NavBrand href="/">
    <img
      src="https://flowbite.com/docs/images/logo.svg"
      class="mr-3 h-6 sm:h-9"
      alt="Logo"
    />
    <span class="self-center whitespace-nowrap text-xl font-semibold text-slate-900">
      Marina
    </span>
  </NavBrand>
  <NavHamburger on:click={toggle} />
  <NavUl {hidden}>
    <!-- <NavLi href="/" active={true}>Home</NavLi> -->
    <NavLi href="/printers">Printers</NavLi>
  </NavUl>
</Navbar>