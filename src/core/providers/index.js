/**
 * Jeli-core Provider Class
 * @param {*} provide 
 */
function ProviderService(provide) {
    var _providers = {};
    this.register = function(moduleName, name, value) {
        //reject all call to register after application bootStrap
        if ($isAfterBootStrap && !_providers[moduleName][name]) { return; }

        if (!_providers[moduleName]) {
            _providers[moduleName] = {};
        }

        _providers[moduleName][name] = value;
    };

    this.resolve = function(moduleName, name, reference) {
        if (!_providers[moduleName]) {
            this.register.apply(this, arguments);
            return false;
        }

        switch (provide) {
            case ('$jProvideProvider'):
                var injected = _providers[moduleName][name];
                if (reference) {
                    //return the resolved $get
                    return dependencyInjectorMain('$resolveProvider', $inject(injected.$get));
                }

                return injected;
                break;
            default:
                return _providers[moduleName][name];
                break
        }
    };
}

/**
 * Register provider
 */
ProviderService.resolveConfig = function(configs) {
    configs.forEach(dependencyInjectorMain);
};

ProviderService.initModule = function(inititalizers) {
    inititalizers.forEach(dependencyInjectorMain);
};

/**
 * ProviderService exports
 */
var interceptor = new HttpProvider();
var $http = AjaxSetup(interceptor, ComponentRef.detectChanges);
ProviderService._factories = new Map();
ProviderService._factories.set('interceptor', interceptor.$get());
ProviderService._factories.set('$http', $http);
ProviderService._factories.set('$promise', _Promise);
ProviderService._factories.set('$defer', Defer);
ProviderService._factories.set('$stacks', new $eventStacks);
ProviderService._factories.set('$jCompiler', HtmlParser.TemplateCompiler);
ProviderService._factories.set('$localStorage', window.localStorage);
ProviderService._factories.set('$sessionStorage', window.sessionStorage);
ProviderService._factories.set('$injector', new DependencyInjectorService());
ProviderService._factories.set('$sce', HtmlParser.sce());
ProviderService._factories.set('$Observer', Observer);
ProviderService._factories.set('$parser', templateParser);
ProviderService._factories.set('$templateCache', new Map());
ProviderService._factories.set('$controller', ControllerInitializer);
ProviderService._factories.set('$resolve', ControllerResolvers);
ProviderService._factories.set('$filter', filterParser);
/**
 * static provider Holder
 */
ProviderService.$isExternalLoader = { status: false };
ProviderService.jDebugProvider = { $disableDebugMode: false };