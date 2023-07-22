import { createElement } from "../../../lib/skeleton/index.js";

import rxjs, { effect, textContent } from "../../../lib/rxjs/index.js";
import CSSLoader from "../../helpers/css.js";

import Release from "./model_release.js";

export default function(ctrl) {
    return (render) => {
        const isActive = (route) => location.pathname.endsWith(route) ? "active" : "";
        const $page = createElement(`
            <div class="component_page_admin">
                <div class="component_menu_sidebar no-select">
                    <a class="header" href="/">
                        <svg class="arrow_left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="m 16,7.16 -4.58,4.59 4.58,4.59 -1.41,1.41 -6,-6 6,-6 z"/>
                        </svg>
                        <svg class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M330 202a81 79 0 00-162 0 81 79 0 000 158 81 79 0 000-158m81 79a81 79 0 1181 79H168" fill="none" stroke="currentColor" stroke-width="35px"/>
                        </svg>
                    </a>
                    <h2>Admin console</h2>
                    <ul>
                        <li><a href="/admin/backend" class="${isActive("/admin/backend")}" data-link>Backend</a></li>
                        <li><a href="/admin/settings" class="${isActive("/admin/settings")}" data-link>Settings</a></li>
                        <li><a href="/admin/logs" class="${isActive("/admin/logs")}" data-link>Logs</a></li>
                        <li class="version"><a href="/admin/about" class="${isActive("/admin/about")}" data-link data-bind="version"></a></li>
                    </ul>
                </div>
                <div class="page_container scroll-y" data-bind="admin"></div>
                <style>${css}</style>
            </div>
        `);
        render($page);

        const $content = $page.querySelector(`[data-bind="admin"]`)
        ctrl(($node) => $content.appendChild($node));

        effect(Release.get().pipe(
            rxjs.map(({ version }) => version),
            textContent($page, `[data-bind="version"]`),
        ));

        return (route) => $content.innerHTML = `<div>loading "${route}"</div>`;
    };
}

const css = await CSSLoader(import.meta, "decorator_sidemenu.css", "index.css");
