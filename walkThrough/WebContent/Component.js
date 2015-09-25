sap.ui.define([
   "sap/ui/core/UIComponent",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/resource/ResourceModel",
	"sap/ui/demo/wt/controller/HelloDialog",
	"sap/ui/model/odata/v2/ODataModel",
	"sap/ui/Device"
], function (UIComponent, JSONModel, ResourceModel, HelloDialog, ODataModel, Device) {
   "use strict";
   return UIComponent.extend("sap.ui.demo.wt.Component", {
	  metadata : {
	            manifest: "json"
	      },
      init : function () {
         // call the init function of the parent
         UIComponent.prototype.init.apply(this, arguments);
         // set data model
         var oData = {
            recipient : {
               name : "World"
            }
         };
         var oModel = new JSONModel(oData);
         this.setModel(oModel);

         // set i18n model
         var i18nModel = new ResourceModel({
            bundleName : "sap.ui.demo.wt.i18n.i18n"
         });
         this.setModel(i18nModel, "i18n");
//         //set invoice model-local
//         var oConfig=this.getMetadata().getConfig();
//         var sNamespace=this.getMetadata().getManifestEntry("sap.app").id;
//         var oInvoiceModel=new JSONModel(jQuery.sap.getModulePath(sNamespace,oConfig.invoiceLocal));
//         this.setModel(oInvoiceModel,"invoice");
         
//         set invoice model-remote
         var oConfig=this.getMetadata().getConfig();
         var oInvoiceModel=new ODataModel(oConfig.invoiceRemote);
         console.log(oConfig.invoiceRemote);
         oInvoiceModel.setUseBatch(false);
         this.setModel(oInvoiceModel,"invoice")
//           disable batch grouping for v2 API of the northwind service
			this.getModel("invoice").setUseBatch(false);
//			 set device model
			var oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.setModel(oDeviceModel, "device");
//          set dialog
	     this.helloDialog = new HelloDialog();
		// create the views based on the url/hash
		this.getRouter().initialize();
	},

	getContentDensityClass : function() {
		if (!this._sContentDensityClass) {
			if (!sap.ui.Device.support.touch) {
				this._sContentDensityClass = "sapUiSizeCompact";
			} else {
				this._sContentDensityClass = "sapUiSizeCozy";
			}
		}
		return this._sContentDensityClass;
	}
   });
});