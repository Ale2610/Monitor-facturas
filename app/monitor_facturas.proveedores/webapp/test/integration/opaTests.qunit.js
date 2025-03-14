sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'monitorfacturas/proveedores/test/integration/FirstJourney',
		'monitorfacturas/proveedores/test/integration/pages/ProveedoresList',
		'monitorfacturas/proveedores/test/integration/pages/ProveedoresObjectPage'
    ],
    function(JourneyRunner, opaJourney, ProveedoresList, ProveedoresObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('monitorfacturas/proveedores') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheProveedoresList: ProveedoresList,
					onTheProveedoresObjectPage: ProveedoresObjectPage
                }
            },
            opaJourney.run
        );
    }
);