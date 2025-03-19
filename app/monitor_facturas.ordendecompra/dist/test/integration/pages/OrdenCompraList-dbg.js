sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'monitorfacturas.ordendecompra',
            componentId: 'OrdenCompraList',
            contextPath: '/OrdenCompra'
        },
        CustomPageDefinitions
    );
});