sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'monitorfacturas.ordendecompra',
            componentId: 'OrdenCompraObjectPage',
            contextPath: '/OrdenCompra'
        },
        CustomPageDefinitions
    );
});