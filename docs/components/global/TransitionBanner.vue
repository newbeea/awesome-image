<template>
  <div>
    <AsTransition
      :transition="{
        name: 'directionalwrap'
      }"
    >
      <template
        #images="{
          toGroupWithIndex
        }"
      >
        <AsImage
          class="demoimage"
          :width="160"
          :height="107"
          :src="'//d3skwsdk169y0b.cloudfront.net/image/fake3d/mount.jpg'"
          :progressive="true"
          :to-group="toGroupWithIndex(0)"
        >
          <template #loading>
            <div class="placeholder" />
          </template>
        </AsImage>
        <AsImage
          class="demoimage"
          :width="160"
          :height="107"
          :src="'//d3skwsdk169y0b.cloudfront.net/image/fake3d/canyon.jpg'"
          :progressive="true"
          :to-group="toGroupWithIndex(1)"
        >
          <template #loading>
            <div class="placeholder" />
          </template>
        </AsImage>
        <AsImage
          class="demoimage"
          :width="160"
          :height="107"
          :src="'//d3skwsdk169y0b.cloudfront.net/image/fake3d/lady.jpg'"
          :progressive="true"
          :to-group="toGroupWithIndex(2)"
        >
          <template #loading>
            <div class="placeholder" />
          </template>
        </AsImage>
      </template>
    </AsTransition>
    <alert>
      AwesomeImage WebGL Transition: 'directionalwrap'
    </alert>
  </div>
</template>
<script>

export default {
  components: {
  },
}
</script>
<style>
.demoimage {
  width: 100%;
}
.placeholder {
  width: 100%;
  height: 100%;
  background-color: #eee;
}
</style>
