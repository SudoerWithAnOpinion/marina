<script lang="ts">
	import { Card, Timeline, TimelineItem } from 'flowbite-svelte';
</script>

<div>
	<Card img="/images/image-1.webp" href="/" horizontal>
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Job: (Job Name)</h5>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
      Some Job Details
    </p>
  </Card>
</div>
<Timeline order="vertical">
	<TimelineItem title="Job Created" date="Some Date Here">
		<svelte:fragment slot="icon">
			<span
				class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
					<!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
					<path
						d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
					/>
				</svg>
			</span>
		</svelte:fragment>
		<p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
			Creation Details
		</p>
	</TimelineItem>
</Timeline>
