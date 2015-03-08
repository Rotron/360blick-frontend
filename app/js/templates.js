angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("main.html","<nav-header></nav-header>\n<div id=\"view--root\" class=\"container\">\n    <section class=\"section section--gallery row\">\n        <h1 class=\"section--gallery_title\">360blick</h1>\n        <p class=\"section--gallery_subtitle\">interactive panorama experiences</p>\n        <button ui-sref=\"register\" class=\"btn btn--round btn--sign-up section--gallery_sign-up\">sign up</button>\n    </section>\n    <section class=\"section section--features row\">\n        <ul class=\"icon-list\">\n            <li class=\"icon-list_item\">\n                <i class=\"fa fa-cube\"></i>\n                <span class=\"icon-list_title icon-list_title--divided\">Scenes & Text</span>\n                <span class=\"icon-list_text\">Add your content and make it interactive.</span>\n            </li>\n            <li class=\"icon-list_item\">\n                <i class=\"fa fa-link\"></i>\n                <span class=\"icon-list_title icon-list_title--divided\">Navigation</span>\n                <span class=\"icon-list_text\">Define Relations and link between Panormas.</span>\n            </li>\n            <li class=\"icon-list_item\">\n                <i class=\"fa fa-magic\"></i>\n                <span class=\"icon-list_title icon-list_title--divided\">Effects</span>\n                <span class=\"icon-list_text\">Add Animations and Transitions for more emotion.</span>\n            </li>\n        </ul>\n    </section>\n    <section class=\"section section--toggle row\">\n        <hgroup>\n            <h2 class=\"section_title\">Interactive Editing</h2>\n            <h3 class=\"section_subtitle\">Interactive panorama experiences with more perspective, you will actually love to edit and share.</h3>\n        </hgroup>\n        <div class=\"section--toggle_images\"></div>\n    </section>\n    <section class=\"section section--options row\">\n        <hgroup>\n            <h2 class=\"section_title\">Show some Awesomeness</h2>\n            <h3 class=\"section_subtitle\">Import your favourite assets with ease and make them even more awesome.</h3>\n        </hgroup>\n        <ul class=\"icon-list icon-list--minor\">\n            <li class=\"icon-list_item\">\n                <i class=\"fa fa-picture-o\"></i>\n                <span class=\"icon-list_text\">Images</span>\n            </li>\n            <li class=\"icon-list_item\">\n                <i class=\"fa fa-cube\"></i>\n                <span class=\"icon-list_text\">3D Models</span>\n            </li>\n            <li class=\"icon-list_item\">\n                <i class=\"fa fa-magic\"></i>\n                <span class=\"icon-list_text\">Filters</span>\n            </li>\n            <li class=\"icon-list_item\">\n                <i class=\"fa fa-video-camera\"></i>\n                <span class=\"icon-list_text\">Videos</span>\n            </li>\n            <li class=\"icon-list_item\">\n                <i class=\"fa fa-font\"></i>\n                <span class=\"icon-list_text\">Text</span>\n            </li>\n        </ul>\n    </section>\n    <footer class=\"footer\">\n        <nav>\n            <ul>\n                <li>\n                    <a href=\"#\">Help</a>\n                </li>\n                <li>\n                    <a href=\"#\">Blog</a>\n                </li>\n                <li>\n                    <a href=\"#\">Documentation</a>\n                </li>\n                <li>\n                    <a href=\"#\">About</a>\n                </li>\n                <li>\n                    <a href=\"#\">Imprint</a>\n                </li>\n            </ul>\n        </nav>\n    </footer>\n</div>\n\n");
$templateCache.put("landingpage/index.html","");
$templateCache.put("landingpage/slideshow.html","");
$templateCache.put("editor/editor.html","<div class=\"editor-header\" id=\"editor-header\">\n    <i ng-click=\"zoomIn()\" class=\"fa fa-plus-square\"></i>\n    <i ng-click=\"zoomOut()\" class=\"fa fa-minus-square\"></i>\n</div>\n<div class=\"editor-wrapper\">\n    <div class=\"editor-view\" id=\"editor-view-container\"></div>\n    <div class=\"editor-sidebar\">\n        <div class=\"objects-wrapper\">\n            <div class=\"scene-object\" ng-repeat=\"item in sceneObjects\" ng-class=\"{active: item.id == currentSelected.id}\">\n                <div class=\"scene-object-inner\">\n                    <div class=\"scene-object-description\">\n                        {{item.type}} {{item.id}}: {{item.geometry.type}}\n                    </div>\n                    <div class=\"scene-object-buttons\">\n                        <i class=\"fa fa-cog\" ng-click=\"item.detailsOpen = !item.detailsOpen\"></i>\n                    </div>\n                </div>\n                <div class=\"scene-object-details\" ng-if=\"item.detailsOpen || item.id == currentSelected.id\">\n                    <min-max-value title=\"Opacity\" item=\"item.material.opacity\" minimum=\"0\" maximum=\"1\" step-size=\"0.1\"></min-max-value>\n                    <xyz-input title=\"Position\" item=\"item.position\"></xyz-input>\n                    <xyz-input title=\"Rotation\" item=\"item.rotation\"></xyz-input>\n                    <xyz-input title=\"Skalierung\" item=\"item.scale\"></xyz-input>\n\n                </div>\n            </div>\n        </div>\n        <div class=\"objects-wrapper\">\n            <div class=\"primitive-object\" ng-repeat=\"type in supportedPrimitiveObjects\" ng-click=\"addNewObject(type)\">\n                {{type}}\n            </div>\n        </div>\n    </div>\n</div>\n\n");
$templateCache.put("auth/login.html","<form ng-submit=\"login(credencials)\">\n    <input type=\"text\" ng-model=\"credencials.login\" placeholder=\"Username\" name=\"login\">\n    <input type=\"password\" ng-model=\"credencials.password\" placeholder=\"Password\" name=\"password\">\n    <input type=\"submit\" value=\"Submit\">\n</form>");
$templateCache.put("auth/register.html","<h1>Register</h1>\n<form ng-submit=\"register(credencials)\">\n    <input type=\"text\" ng-model=\"credencials.nick\" placeholder=\"Username\" name=\"nick\">\n    <input type=\"text\" ng-model=\"credencials.email\" placeholder=\"Email\" name=\"email\">\n    <input type=\"password\" ng-model=\"credencials.password\" placeholder=\"Password\" name=\"password\">\n    <input type=\"submit\" value=\"Submit\">\n</form>");
$templateCache.put("user/assets.html","Assets von User {{username}}\n");
$templateCache.put("user/blick.html","Blick {{username}} {{blickId}}");
$templateCache.put("user/gallery.html","Gallery von User {{username}}\n");
$templateCache.put("user/index.html","<nav-header></nav-header>\n<div id=\"view--user\">\n    <div ng-if=\"currentUser\">Welcome, {{ currentUser.name }}</div>\n\n    <div ng-switch on=\"currentUser.role\">\n        <div ng-switch-when=\"userRoles.admin\">Role: admin.</div>\n        <div ng-switch-when=\"userRoles.editor\">Role: editor.</div>\n        <div ng-switch-default>Role: You\'re something else.</div>\n    </div>\n\n    <button ui-sref=\"user\" class=\"btn btn--round\">Gallery</button>\n    <button ui-sref=\"user.assets\" class=\"btn btn--round\">Assets</button>\n    <button ui-sref=\"user.settings\" class=\"btn btn--round\">Settings</button>\n    <button ui-sref=\"user.blick\" class=\"btn btn--round\">Blick</button>\n    <div ui-view=\"userContent\" class=\"reveal-animation\"></div>\n</div>");
$templateCache.put("user/settings.html","Settings von User {{username}}\n");
$templateCache.put("partials/header.html","<header class=\"header\">\n    <div class=\"container\">\n        <div class=\"col span-6\">360blick</div>\n        <div class=\"col span-6 has-text-right\">\n            <button ui-sref=\"login\" class=\"btn btn--round btn--sign-in\">sign in</button>\n            <button ui-sref=\"user({username: \'david\'})\">GO: David</button>\n            <button ng-click=\"logout()\" class=\"btn btn--round\">logout</button>\n        </div>\n    </div>\n</header>");
$templateCache.put("partials/login.html","<div class=\"dialog\">\n    <div class=\"dialog_content\">\n        <div class=\"dialog_header\">\n            <button type=\"button\" class=\"dialog_close\" ng-click=\"closeIt()\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n            <h4 class=\"dialog_title\">Login</h4>\n        </div>\n        <div class=\"dialog_body\">\n            <form name=\"loginForm\" class=\"container\"\n                  ng-controller=\"LoginController\" ng-submit=\"login(credentials)\" novalidate>\n                <fieldset class=\"row\">\n                    <placeholder-input value=\"credentials.login\" label=\"Username\" type=\"text\"></placeholder-input>\n                </fieldset>\n                <fieldset class=\"row\">\n                    <placeholder-input value=\"credentials.password\" label=\"Password\" type=\"password\"></placeholder-input>\n                </fieldset>\n                <div class=\"row\">\n                    <button class=\"btn btn--round btn--submit\">Login</button>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>\n\n");
$templateCache.put("partials/minMaxValue.html","<div>\n    <div>\n        {{title}}: <input type=\"number\" ng-model=\"item\" min=\"{{min}}\" max=\"{{max}}\" step=\"{{step || 1}}\">\n    </div>\n</div>");
$templateCache.put("partials/placeholderInput.html","<div class=\"input\" ng-class=\"{\'is-filled\': value, \'is-focused\': isFocused}\" ng-click=\"setFocus()\">\n    <label class=\"input_label\">{{label}}</label>\n    <input type=\"{{type}}\" class=\"input_field\" ng-model=\"value\" ng-change=\"onChange()\" ng-blur=\"onBlur()\">\n</div>");
$templateCache.put("partials/siteHeader.html","<div class=\"site-header\">\n    360blick\n</div>");
$templateCache.put("partials/xyzInput.html","<div>\n    <div>{{title}}</div>\n    <div>\n        X: <input type=\"number\" ng-model=\"item.x\">\n    </div>\n    <div>\n        Y: <input type=\"number\" ng-model=\"item.y\">\n    </div>\n    <div>\n        Z: <input type=\"number\" ng-model=\"item.z\">\n    </div>\n</div>");}]);