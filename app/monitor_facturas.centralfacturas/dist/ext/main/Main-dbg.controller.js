sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
  ], function (Controller, MessageToast) {
    "use strict";
  
    return Controller.extend("monitorfacturas.controller.CentralFacturas", {

      compradorPress: function (oEvent) {
        const sTile = oEvent.getSource().getHeader();
        MessageToast.show("Seleccionaste: " + sTile);
        // Aquí podrías hacer navegación a otras vistas usando oRouter.navTo()
        var oLink = oEvent.getSource();
    
                // Acceder al contexto del control (por ejemplo, el contexto de la fila en una tabla)
                var oItem = oLink.getParent(); // En el caso de una tabla, obtiene la fila
                var oContext = oItem.getBindingContext(); // Obtiene el contexto de la fila seleccionada

                var sUrl = "#monitorfacturascompradorbandej-display";
                
                // Usar window.open para abrir la URL en una nueva ventana
                window.open(sUrl, "_blank");
      },

      almacenistaPress: function (oEvent) {
        const sTile = oEvent.getSource().getHeader();
        MessageToast.show("Seleccionaste: " + sTile);
        // Aquí podrías hacer navegación a otras vistas usando oRouter.navTo()
        var oLink = oEvent.getSource();
    
                // Acceder al contexto del control (por ejemplo, el contexto de la fila en una tabla)
                var oItem = oLink.getParent(); // En el caso de una tabla, obtiene la fila
                var oContext = oItem.getBindingContext(); // Obtiene el contexto de la fila seleccionada

                var sUrl = "#monitorfacturasbandejaentradaa-display";
                
                // Usar window.open para abrir la URL en una nueva ventana
                window.open(sUrl, "_blank");
      }, 

      botPress: function (oEvent) {
        const sTile = oEvent.getSource().getHeader();
        MessageToast.show("Seleccionaste: " + sTile);
        // Aquí podrías hacer navegación a otras vistas usando oRouter.navTo()
        var oLink = oEvent.getSource();
    
                // Acceder al contexto del control (por ejemplo, el contexto de la fila en una tabla)
                var oItem = oLink.getParent(); // En el caso de una tabla, obtiene la fila
                var oContext = oItem.getBindingContext(); // Obtiene el contexto de la fila seleccionada

                var sUrl = "#monitorfacturasbandejaentradab-display";
                
                // Usar window.open para abrir la URL en una nueva ventana
                window.open(sUrl, "_blank");
      },

      contabiPress: function (oEvent) {
        const sTile = oEvent.getSource().getHeader();
        MessageToast.show("Seleccionaste: " + sTile);
        // Aquí podrías hacer navegación a otras vistas usando oRouter.navTo()
        var oLink = oEvent.getSource();
    
                // Acceder al contexto del control (por ejemplo, el contexto de la fila en una tabla)
                var oItem = oLink.getParent(); // En el caso de una tabla, obtiene la fila
                var oContext = oItem.getBindingContext(); // Obtiene el contexto de la fila seleccionada

                var sUrl = "#monitorfacturasbandejaentradac-display";
                
                // Usar window.open para abrir la URL en una nueva ventana
                window.open(sUrl, "_blank");
      }
    });
  });
  