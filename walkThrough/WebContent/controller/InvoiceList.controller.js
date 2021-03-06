sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
    	"sap/ui/demo/wt/model/formatter",
    	"sap/ui/model/Filter",
    	"sap/ui/model/FilterOperator"
],function(Controller,JSONModel,formatter, Filter, FilterOperator){
	"use strict";
	
	return Controller.extend("sap.ui.demo.wt.controller.InvoiceList",{
		
		onPress: function (oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			console.log('111222');
			console.log(oItem);
			oRouter.navTo("detail",{
				invoicePath: oItem.getBindingContext("invoice").getPath().substr(1)
			});
		},
		formatter: formatter,
		onInit:function(){
			var oViewModel = new JSONModel({
				currency:"EUR"
			});
			this.getView().setModel(oViewModel,"view");
		},
		onFilterInvoice:function(oEvent){
			//build filter array
			var aFilter=[];
			var sQuery=oEvent.getParameter("query");
			if(sQuery){
				aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
			}
			// filter binding
			
			var oList=this.getView().byId("invoiceList");
			var oBinding=oList.getBinding("items");
			oBinding.filter(aFilter);
		}
	});
});
