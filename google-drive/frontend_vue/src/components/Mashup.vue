<template>
  <div id="app">

    <div id="keditor1">

    </div>

  </div>
</template>

<script>
export default {
  name: "Mashup.vue",
  created() {
    var app;
    var content = localStorage["keditor.editing.content"];

    if(content) $('#keditor1').innerHTML(content);

      $('#keditor1').keditor({
        // iframeMode: true,
        tabContainersText: '<i class="fa fa-th-list"></i>',
        tabComponentsText: '<i class="fa fa-file"></i>',
        extraTabs: {
          setting: {
            text: '<i class="fa fa-cogs"></i>',
            title: 'Settings',
            content: (
                '<div class="form-horizontal">' +
                '   <h3>Here is Custom Tab Content!</h3>' +
                '</div>'
            )
          }
        },
        niceScrollEnabled: false,
        tabTooltipEnabled: false,
        snippetsTooltipEnabled: false,
        containerSettingEnabled: true,
        containerSettingInitFunction: function (form, keditor) {
          console.log("containerSettingInitFunction  : ",form, keditor);
          form.append(
              '<div class="form-horizontal">' +
              '   <h3>Here is Setting Container Panel!</h3>' +
              '</div>'
          );
        },
        containerSettingShowFunction: function (form, container, keditor) {
          console.log("containerSettingShowFunction : ",form, container, keditor);
        },
        containerSettingHideFunction: function (form, keditor) {
          console.log("containerSettingHideFunction : ",form, keditor);
        }
      });


  }
}
</script>

<style scoped>

</style>