sap.ui.define([],
function (){
    "use strict";
    return {
        onInit: function (oEvent) {
            this.extensionAPI.attachPageDataLoaded(
                function (oEvent) {
                   if(oEvent.context.getObject().StatusDescription=="Submitted"){
                    this.getView().byId("escalationreportscc::sap.suite.ui.generic.template.ObjectPage.view.Details::Report_Submit_to_Under_Review--template::Share").setVisible(false);
                   }
           else{
            this.getView().byId("escalationreportscc::sap.suite.ui.generic.template.ObjectPage.view.Details::Report_Under_Review_to_Closed--template::Share").setVisible(false);
           }
            
                }.bind(this)
            );
         },
        test: function(oEvent) {
            alert('test');
        }
    };
});
