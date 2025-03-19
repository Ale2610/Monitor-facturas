sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'monitorfacturas/ordendecompra/test/integration/FirstJourney',
		'monitorfacturas/ordendecompra/test/integration/pages/OrdenCompraList',
		'monitorfacturas/ordendecompra/test/integration/pages/OrdenCompraObjectPage'
    ],
    function(JourneyRunner, opaJourney, OrdenCompraList, OrdenCompraObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('monitorfacturas/ordendecompra') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheOrdenCompraList: OrdenCompraList,
					onTheOrdenCompraObjectPage: OrdenCompraObjectPage
                }
            },
            opaJourney.run
        );
    }
);