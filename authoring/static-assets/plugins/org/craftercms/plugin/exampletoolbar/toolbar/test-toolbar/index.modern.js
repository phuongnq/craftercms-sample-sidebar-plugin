const React = craftercms.libs.React;
const { useState, useEffect } = craftercms.libs.React;
const React__default = craftercms.libs.React && Object.prototype.hasOwnProperty.call(craftercms.libs.React, 'default') ? craftercms.libs.React['default'] : craftercms.libs.React;
const { useIntl } = craftercms.libs.ReactIntl;
const ToolsPanelListItemButton = craftercms.components.ToolsPanelListItemButton && Object.prototype.hasOwnProperty.call(craftercms.components.ToolsPanelListItemButton, 'default') ? craftercms.components.ToolsPanelListItemButton['default'] : craftercms.components.ToolsPanelListItemButton;
const { createAction } = craftercms.libs.ReduxToolkit;
const { useDispatch } = craftercms.libs.ReactRedux;
const createEmotion = craftercms.libs.createEmotion && Object.prototype.hasOwnProperty.call(craftercms.libs.createEmotion, 'default') ? craftercms.libs.createEmotion['default'] : craftercms.libs.createEmotion;
const { Box, CircularProgress, Grid, Typography } = craftercms.libs.MaterialUI;
const { fetchAll } = craftercms.services.sites;
const { SiteCard } = craftercms.components;

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
// endregion
// region Widget Dialog
const showWidgetDialog = /*#__PURE__*/ createAction('SHOW_WIDGET_DIALOG');
// endregion

function ViewSitesPanelButton() {
    var formatMessage = useIntl().formatMessage;
    var dispatch = useDispatch();
    return (React.createElement(ToolsPanelListItemButton, { icon: { id: '@mui/icons-material/SearchRounded' }, onClick: function () {
            return dispatch(showWidgetDialog({
                title: formatMessage({
                    id: 'taxonomySearch',
                    defaultMessage: 'Taxonomy search'
                }),
                widget: {
                    id: 'org.craftercms.sample.taxonomySearch'
                }
            }));
        }, title: formatMessage({
            id: 'taxonomySearch',
            defaultMessage: 'Taxonomy search'
        }) }));
}

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
const showSystemNotification = /*#__PURE__*/ createAction('SHOW_SYSTEM_NOTIFICATION');

var NonReactComponent = {
    main: function (_a) {
        var _b;
        var craftercms = _a.craftercms, element = _a.element, configuration = _a.configuration;
        var _c = createEmotion({ key: 'nonreactcomponent' }), css = _c.css, flush = _c.flush;
        var store = craftercms.getStore();
        var className = css({
            margin: '.5em',
            padding: '.5em',
            border: '2px solid #000',
            textAlign: 'center',
            color: (_b = configuration.fontColor) !== null && _b !== void 0 ? _b : 'green'
        });
        var user = store.getState().user.username;
        var button = document.createElement('button');
        button.innerHTML = 'Click for snack';
        button.style.margin = '10px auto 0';
        button.style.display = 'block';
        button.onclick = function () {
            store.dispatch(showSystemNotification({
                message: craftercms.utils.i18n.getCurrentIntl().formatMessage({
                    id: 'myTestTranslation',
                    defaultMessage: 'Showing the default translation'
                })
            }));
        };
        element.classList.add(className);
        element.innerHTML = "Hello from the non-react world, " + user + ".";
        element.appendChild(button);
        return function () {
            // Component destruction logic
            flush();
        };
    }
};

var myTestTranslation$1 = "Hello, this is a test translation";
var en = {
	myTestTranslation: myTestTranslation$1
};

var myTestTranslation = "Hola, esta es una traducción de prueba";
var es = {
	myTestTranslation: myTestTranslation
};

function SitesView(props) {
    var _a = useState(), sites = _a[0], setSites = _a[1];
    useEffect(function () {
        var subscription = fetchAll().subscribe(function (sites) { return setSites(sites); });
        return function () { return subscription.unsubscribe(); };
    }, []);
    if (!sites) {
        return (React__default.createElement(Box, { sx: { height: '100%', minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React__default.createElement(CircularProgress, null)));
    }
    return (React__default.createElement(Box, { sx: { p: 1 } },
        React__default.createElement(Grid, { container: true, spacing: 2 }, sites.map(function (site) { return (React__default.createElement(Grid, { key: site.id, item: true },
            React__default.createElement(SiteCard, { site: site, onSiteClick: function () { return undefined; }, onDeleteSiteClick: null, onEditSiteClick: null, onPublishButtonClick: null, publishingStatus: false }))); })),
        React__default.createElement(Typography, { variant: "body2", textAlign: "center" },
            "You have ",
            sites.total,
            " site",
            sites.total > 1 ? 's' : '')));
}

var plugin = {
    id: 'org.craftercms.plugin.exampletoolbar',
    locales: {
        en: en,
        es: es
    },
    widgets: {
        'org.craftercms.sampleToolbarPlugin.components.reactComponent': ViewSitesPanelButton,
        'org.craftercms.sample.taxonomySearch': SitesView,
        'org.craftercms.sample.nonReactComponent': NonReactComponent
    },
    scripts: [
    // Below are examples of how to load scripts into the Studio runtime
    // {
    //   src: 'https://code.jquery.com/jquery-3.5.1.min.js',
    //   integrity: 'sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=',
    //   crossorigin: 'anonymous'
    // },
    // 'script.js'
    ],
    stylesheets: [
    // Examples of how to load stylesheets into the Studio runtime
    // 'index.css'
    ]
};

export { NonReactComponent, ViewSitesPanelButton, plugin as default };
