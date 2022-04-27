sap.ui.define(
    [
      "sap/ui/model/Filter",
      "sap/ui/comp/smartfilterbar/SmartFilterBar",
      "sap/m/ComboBox",
    ],
    function (Filter, SmartFilterBar, ComboBox) {
      "use strict";
      var oExtPeriodModel;
      return {
        onInit: function (oEvent) {
          oExtPeriodModel = new sap.ui.model.json.JSONModel();
          this.getOwnerComponent().setModel(oExtPeriodModel, "oExtPeriodModel");
          this.getView().byId("escalationreportscc::sap.suite.ui.generic.template.ListReport.view.ListReport::Report_Submit_to_Under_Review--listReport-1").setSmartVariant();
          this.getView().byId("escalationreportscc::sap.suite.ui.generic.template.ListReport.view.ListReport::Report_Submit_to_Under_Review--listReport-2").setSmartVariant();
          this.getView().byId("escalationreportscc::sap.suite.ui.generic.template.ListReport.view.ListReport::Report_Submit_to_Under_Review--listReportFilter").setPersistencyKey(true);  
          this.getView().byId("escalationreportscc::sap.suite.ui.generic.template.ListReport.view.ListReport::Report_Submit_to_Under_Review--template::Share").setVisible(false);
      },
  /*      getCustomAppStateDataExtension: function (oCustomData) {
          //the content of the custom field will be stored in the app state, so that it can be restored later, for example after a back navigation.
          //The developer has to ensure that the content of the field is stored in the object that is passed to this method.
          //test
          if (oCustomData) {
            var oCustomField1 = this.oView.byId("ExtYear");
            if (oCustomField1) {
              oCustomData.ExtYearName = oCustomField1.getSelectedKey();
            }
          }
        },
        restoreCustomAppStateDataExtension: function (oCustomData) {
          //in order to restore the content of the custom field in the filter bar, for example after a back navigation,
          //an object with the content is handed over to this method. Now the developer has to ensure that the content of the custom filter is set to the control
          if (oCustomData) {
            if (oCustomData.ExtYearName) {
              var oComboBox = this.oView.byId("ExtYear");
              oComboBox.setSelectedKey(oCustomData.ExtYearName);
            }
          }
        },
        onBeforeRebindTableExtension: function (oEvent) {
          var oBindingParams = oEvent.getParameter("bindingParams");
          oBindingParams.parameters = oBindingParams.parameters || {};
          var vExtYear = this.byId("ExtYear").getSelectedKey();
          if (
            vExtYear === null ||
            vExtYear === "" ||
            vExtYear === undefined ||
            vExtYear === ""
          ) {
          } else {
            oBindingParams.filters.push(new Filter("CRFYear", "EQ", vExtYear));
            oBindingParams.filters.push(
              new Filter("PSInvoiceFYear", "EQ", vExtYear)
            );
          }
          var vExtPeriod = this.byId("ExtPeriod").getSelectedKey();
          if (
            vExtPeriod === null ||
            vExtPeriod === "" ||
            vExtPeriod === undefined ||
            vExtPeriod === ""
          ) {
          } else {
            oBindingParams.filters.push(
              new Filter("PSInvoicePeriod", "EQ", vExtPeriod)
            );
            oBindingParams.filters.push(new Filter("CRPeriod", "EQ", vExtPeriod));
          }
        },
        selectionChangeYear: function (oEvent) {
          var extPeriod = sap.ui.getCore().byId("ExtPeriod");
          var oModel = this.getOwnerComponent().getModel();
          var oFilterR = new sap.ui.model.Filter({
            filters: [
              new sap.ui.model.Filter(
                "FYCODE",
                "EQ",
                oEvent.getParameter("selectedItem").getKey()
              ),
            ],
          });
          var that = this;
          oModel.read("/GetFiscalPeriod", {
            filters: [oFilterR],
            success: function (oResponse) {
              if (oResponse.results.length > 0) {
                oResponse.results.splice(0, 0, {
                  FYCODE: "",
                  PERIODID: "",
                  Name: "All",
                });
                that.oView.byId("ExtPeriod").setValue("All");
              } else {
                that.oView.byId("ExtPeriod").setValue();
              }
              that
                .getOwnerComponent()
                .getModel("oExtPeriodModel")
                .setProperty("/", oResponse.results);
            },
            error: function (err) {},
          });
        }, 
        */
       onPressCRlist: function (oEvt) {
        this.BTPCRNO = oEvt
          .getSource()
          .getBindingContext()
          .getObject().BTPCRNO;
    
          this.onNoofCRNavigate();
        // if (!this._ListNoofCRsDialog) {
        //   this._ListNoofCRsDialog = sap.ui.xmlfragment(
        //     "escalationreportscc.ext.fragments.ListNoofCR",
        //     this
        //   );
        //   this.getView().addDependent(this._ListNoofCRsDialog);
        // }
        // this._ListNoofCRsDialog.open();
        // var sDialog = sap.ui.getCore().byId("NoofCRPopup");
        // sDialog.setTitle("Selected Credit Request No" + " " + this.BTPCRNO);
      },
    
      onNooFCRClose: function () {
        this._ListNoofCRsDialog.close();
      },
    
      onNoofCRNavigate: function (oEvent) {
          var that=this;
        if (sap.ushell && sap.ushell.Container && sap.ushell.Container.getService) {
          // var oCrossAppNav = sap.ushell.Container.getService(
          //   "CrossApplicationNavigation"
          // );
          // oCrossAppNav.toExternal({
          //   target: { semanticObject: "storecrmanagement", action: "manage" },
          //   params: { PsplInvoice: [this.InvoiceNo] },
          // });
          var oCrossAppNav = sap.ushell.Container.getServiceAsync(
              "CrossApplicationNavigation"
            );
            oCrossAppNav.then(function(obj) {
               obj.toExternal({
              target: { semanticObject: "scccrmanagement", action: "manage" },
              params: { BTPCRNO: [that.BTPCRNO] },
            });
            })
        }
      },
      };
    }
  );
  