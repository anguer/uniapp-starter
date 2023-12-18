<script setup lang="ts">
  onLaunch(() => {
    console.log('App Launch');
  });

  onShow(async () => {
    console.log('App Show');
  });

  onHide(() => {
    console.log('App Hide');
  });
</script>
<style>
  @import '@/assets/index.css';
</style>
