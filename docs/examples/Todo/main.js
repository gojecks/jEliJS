!function(factory){
'use strict';
var /** JELI DEPENDECY HUB **/__JELI__DEPENDENCY__HUB__ = {
'viewers/Todo/src/app/app.module.js': function(exports){
var CalculatorComponent = __required('viewers/Todo/src/app/components/calculator/calculator.js')['CalculatorComponent'];
var AppRootElement = __required('viewers/Todo/src/app/app.component.js')['AppRootElement'];
var ItemList = __required('viewers/Todo/src/app/components/item-list.js')['ItemList'];
var TestPlaceElement = __required('viewers/Todo/src/app/components/test-place.js')['TestPlaceElement'];
var http = __required('dist/http/bundles/jeli-http-module.js');
var HttpModule = http['HttpModule'];
var form = __required('dist/form/bundles/jeli-form-module.js');
var FormModule = form['FormModule'];
var common = __required('dist/common/bundles/jeli-common-module.js');
var CommonModule = common['CommonModule'];
/** compiled AppModule **/
var AppModule = function(){
"use strict";

function AppModule() {
    console.log('triggered');
}

AppModule.annotations = {
    requiredModules: [
        CommonModule,
        FormModule,
        HttpModule
    ],
    rootElement: AppRootElement,
    selectors: [
        AppRootElement,
        CalculatorComponent,
        TestPlaceElement,
        ItemList
    ]
};
return AppModule;
}();

exports.AppModule = AppModule;
},
'dist/common/bundles/jeli-common-module.js': function(exports){
var helpers = __required('node_modules/js-helpers/helpers.js');
var isarray = helpers['isarray'];
var isobject = helpers['isobject'];
var isequal = helpers['isequal'];
var inarray = helpers['inarray'];
var isundefined = helpers['isundefined'];
var isfunction = helpers['isfunction'];
var core = __required('dist/core/bundles/jeli-core-module.js');
var ElementClassList = core['ElementClassList'];
var IterableProfiler = core['IterableProfiler'];
function jForRow(context, count) {
    this.count = count;
    this.index = context.idx;
    Object.defineProperties(this, {
        $context: {
            get: function () {
                return context.value;
            }
        },
        first: {
            get: function () {
                return this.index > 0;
            }
        },
        last: {
            get: function () {
                return this.count - 1 === this.index;
            }
        },
        even: {
            get: function () {
                return this.index % 2 === 0;
            }
        },
        odd: {
            get: function () {
                return !this.even;
            }
        }
    });
}
var ForDirective = function () {
    'use strict';
    function ForDirective(viewRef, TemplateRef) {
        this.iterable = new IterableProfiler();
        this._forIn = null;
        this.trackBy;
        this.queryList = new Map();
        this._listenerFn = function () {
            var _this = this;
            this.iterable.forEachDeleted(function (index) {
                var viewRef = _this.queryList.get(index);
                if (viewRef) {
                    viewRef.removeView();
                }
            });
            this.iterable.forEachChanges(function (key) {
                var cacheElementRef = _this.queryList.get(key);
                if (cacheElementRef) {
                    cacheElementRef.updateContext({
                        index: key,
                        count: _this._forIn.length
                    });
                }
            });
            this.iterable.forEachInserted(function (item) {
                var context = new jForRow(item, null);
                var view = viewRef.createEmbededView(TemplateRef);
                view.setContext(context);
                _this.queryList.set(item.idx, view);
            });
        };
        Object.defineProperties(this, {
            forIn: {
                set: function (value) {
                    this._forIn = value;
                }
            }
        });
    }
    ForDirective.prototype.willObserve = function () {
        var changes = this.iterable.diff(this._forIn);
        if (changes) {
            this._listenerFn();
        }
    };
    ForDirective.prototype.viewDidDestroy = function () {
        this.queryList.forEach(function (viewRef) {
            viewRef.removeView();
        });
        this._forIn = null;
        this.queryList.clear();
        this.iterable.destroy();
    };
    ForDirective.annotations = {
        selector: 'for',
        DI: {
            ViewRef: { optional: true },
            TemplateRef: { optional: true }
        },
        props: {
            forIn: {},
            trackBy: {}
        },
        module: 'CommonModule'
    };
    return ForDirective;
}();
var IncludeDirective = function () {
    'use strict';
    function IncludeDirective(viewRef, $sce) {
        this._jInclude = undefined;
        this.compileView = function () {
            if (this._jInclude) {
                if (!this._isCompiled) {
                    if (isfunction(this._jInclude)) {
                        template = content(elementRef);
                    } else {
                        template = ViewParser.parseFromString(content);
                    }
                    elementRef.parent.insertAfter(template, elementRef.nativeNode);
                }
            }
        };
        this.resetIncludeTemplate = function () {
            if (this.compiledElem) {
                this.compiledElem.remove();
            }
        };
        this.process = function (value) {
            if (!value) {
                return;
            }
            this.resetIncludeTemplate();
            this.compileHtml(value);
        };
        Object.defineProperties(this, {
            include: {
                set: function () {
                    this._jInclude = value;
                    this.compileView();
                }
            }
        });
    }
    IncludeDirective.annotations = {
        selector: 'include',
        props: {
            include: {},
            template: { type: 'TemplateRef' }
        },
        DI: {
            ViewRef: { optional: true },
            $sce: { optional: true }
        },
        module: 'CommonModule'
    };
    return IncludeDirective;
}();
var IfDirective = function () {
    'use strict';
    function IfDirective(viewRef, templateRef) {
        this._jIfValue = false;
        this._thenTemplateRef = templateRef;
        this._elseTemplateRef = null;
        this._thenView = null;
        this._elseView = null;
        this.createView = function () {
            if (this._jIfValue) {
                if (!this._thenView) {
                    viewRef.clearView();
                    this._elseView = null;
                    if (this._thenTemplateRef) {
                        this._thenView = viewRef.createEmbededView(this._thenTemplateRef);
                    }
                }
            } else {
                if (!this._elseView) {
                    viewRef.clearView();
                    this._thenView = null;
                    if (this._elseTemplateRef) {
                        this._elseView = viewRef.createEmbededView(this._elseTemplateRef);
                    }
                }
            }
        };
        Object.defineProperties(this, {
            if: {
                set: function (value) {
                    this._jIfValue = value;
                    this.createView();
                }
            },
            ifElse: {
                set: function (templateRef) {
                    this._elseTemplateRef = templateRef;
                    this.createView();
                }
            },
            ifThen: {
                set: function (templateRef) {
                    if (templateRef) {
                        this._thenTemplateRef = templateRef;
                        this.createView();
                    }
                }
            }
        });
    }
    IfDirective.annotations = {
        selector: 'if',
        DI: {
            ViewRef: { optional: true },
            TemplateRef: { optional: true }
        },
        props: {
            if: {},
            ifElse: { type: 'TemplateRef' },
            ifThen: { type: 'TemplateRef' }
        },
        module: 'CommonModule'
    };
    return IfDirective;
}();
var SelectDirective = function () {
    'use strict';
    function SelectDirective(elementRef) {
        var valueRef, valueKey, select, groupBy, labelAs;
        this.cacheValue = [];
        this.optionsLabel = null;
        this.optionsData = [];
        this.didInit = function () {
            this.createSelectOptions();
        };
        this.createSelectOptions = function () {
            var fragment = document.createDocumentFragment(), nCollection = new Map(), _this = this;
            function createCollection(value, key) {
                var nModel = {};
                nModel[valueRef] = value;
                if (valueKey) {
                    nModel[valueKey] = key;
                }
                var optValue = ModelSetterGetter(select, nModel), label = ModelSetterGetter(labelAs, nModel);
                if (_this.optionsLabel) {
                    label = _this.optionsLabel[label];
                }
                var opt = new ElementRef(document.createElement('option'), elementRef, {});
                opt.setProp('value', optValue);
                opt.text(label);
                if (groupBy) {
                    var ref = ModelSetterGetter(groupBy, nModel);
                    if (!nCollection.has(ref)) {
                        var optgroup = document.createElement('optgroup');
                        optgroup.innerText = ref;
                        nCollection.set('ref', optgroup);
                        fragment.appendChild(optgroup);
                    }
                    nCollection.get(ref).appendChild(opt);
                } else {
                    fragment.appendChild(opt.nativeElement);
                }
                elementRef.children.add(opt);
            }
            this.optionsData.forEach(createCollection);
            elementRef.html(fragment);
            nCollection = null;
        };
        Object.defineProperties(this, {
            select: {
                set: function (binding) {
                    var collectionExp = binding.match(/^\s*(.+)\s+for+\s+(.*?)\s+in\s+(.*?)\s*(\s+track\s+by\s+(.+)\s*)?$/);
                    if (isundefined(collectionExp[3])) {
                        errorBuilder('invalid condition received in select, expecting _item_ in iteratable or (_idx_, _item_) in iteratable');
                    }
                    var _spltValue = collectionExp[2].split(/\W/g).filter(function (key) {
                        return key.length > 1;
                    });
                    valueRef = _spltValue.pop();
                    valueKey = _spltValue.pop();
                    select = collectionExp[1];
                    groupBy;
                    labelAs;
                    if (inarray('group by', collectionExp[1])) {
                        var gby = collectionExp[1].split(/\s+group+\s+by+\s/);
                        collectionExp[1] = gby.shift();
                        select = collectionExp[1];
                        groupBy = gby.pop();
                    }
                    if (inarray(' as ', collectionExp[1])) {
                        var lAs = collectionExp[1].split(/\s+as+\s/);
                        labelAs = lAs.pop();
                        select = lAs.pop();
                    } else {
                        labelAs = select;
                    }
                    this.optionsData = elementRef.context.evaluate(collectionExp[3]);
                }
            }
        });
    }
    SelectDirective.annotations = {
        selector: 'select',
        DI: { ElementRef: { optional: true } },
        props: {
            select: {},
            optionsLabel: {}
        },
        module: 'CommonModule'
    };
    return SelectDirective;
}();
function SwitchViewContext(viewRef, templateRef) {
    this._isCreated = false;
    this.setState = function (create) {
        if (create && !this._isCreated) {
            this.createView();
        } else if (!create && this._isCreated) {
            this.destroyView();
        }
    };
    this.createView = function () {
        this._isCreated = true;
        viewRef.createEmbededView(templateRef);
    };
    this.destroyView = function () {
        this._isCreated = false;
        viewRef.clearView();
    };
}
var SwitchDirective = function () {
    'use strict';
    function SwitchDirective() {
        this._caseCount = 0;
        this.defaultViews;
        this._lastCaseCheckIndex = 0;
        this._isDefaultCase = false;
        this._previousValue = undefined;
        this._lastCaseMatched = false;
        this._addCase = function () {
            this._caseCount++;
        };
        this._addDefaultView = function (viewContext) {
            if (!this.defaultViews) {
                this.defaultViews = [];
            }
            this.defaultViews.push(viewContext);
        };
        Object.defineProperty(this, 'switch', {
            set: function (value) {
                this._jSwitch = value;
                if (isequal(this._caseCount, 0)) {
                    this._compileDefaultView(true);
                }
            }
        });
    }
    SwitchDirective.prototype._compileDefaultView = function (isDefaultCase) {
        if (this.defaultViews && !isequal(this._isDefaultCase, isDefaultCase)) {
            this._isDefaultCase = isDefaultCase;
            for (var i = 0; i < this.defaultViews.length; i++) {
                var defaultView = this.defaultViews[i];
                defaultView.setState(isDefaultCase);
            }
        }
    };
    SwitchDirective.prototype.viewDidDestroy = function () {
    };
    SwitchDirective.prototype._matchCase = function (caseValue) {
        var matched = isequal(this._jSwitch, caseValue);
        this._lastCaseMatched = this._lastCaseMatched || matched;
        this._lastCaseCheckIndex++;
        if (isequal(this._lastCaseCheckIndex, this._caseCount)) {
            this._compileDefaultView(!this._lastCaseMatched);
            this._lastCaseCheckIndex = 0;
            this._lastCaseMatched = false;
        }
        return matched;
    };
    SwitchDirective.annotations = {
        selector: 'switch',
        props: { switch: {} },
        module: 'CommonModule'
    };
    return SwitchDirective;
}();
var SwitchCaseDirective = function () {
    'use strict';
    function SwitchCaseDirective(viewRef, templateRef, jSwitch) {
        jSwitch._addCase();
        this._view = new SwitchViewContext(viewRef, templateRef);
        this.willObserve = function () {
            this._view.setState(jSwitch._matchCase(this.switchCase));
        };
    }
    SwitchCaseDirective.annotations = {
        selector: 'switchCase',
        props: { switchCase: {} },
        DI: {
            ViewRef: { optional: true },
            TemplateRef: { optional: true },
            ParentRef: {
                optional: true,
                value: 'switch'
            }
        },
        dynamicInjectors: true,
        module: 'CommonModule'
    };
    return SwitchCaseDirective;
}();
var SwitchDefaultDirective = function () {
    'use strict';
    function SwitchDefaultDirective(viewRef, templateRef, jSwitch) {
        jSwitch._addDefaultView(new SwitchViewContext(viewRef, templateRef));
    }
    SwitchDefaultDirective.annotations = {
        selector: 'switchDefault',
        DI: {
            ViewRef: { optional: true },
            TemplateRef: { optional: true },
            ParentRef: {
                optional: true,
                value: 'switch'
            }
        },
        dynamicInjectors: true,
        module: 'CommonModule'
    };
    return SwitchDefaultDirective;
}();
var ClassDirective = function () {
    'use strict';
    function ClassDirective(elementRef) {
        this._jClass = undefined;
        this.lastAddedClass = '';
        this._changeClass = function () {
            if (isobject(this._jClass)) {
                ElementClassList.add(elementRef.nativeElement, this._jClass);
            } else {
                ElementClassList.add(elementRef.nativeElement, this.lastAddedClass, false);
                if (this._jClass) {
                    ElementClassList.add(elementRef.nativeElement, this._jClass, true);
                    this.lastAddedClass = this._jClass;
                }
            }
        };
        Object.defineProperty(this, 'class', {
            set: function (value) {
                this._jClass = value;
                this._changeClass();
            }
        });
    }
    ClassDirective.annotations = {
        selector: 'class',
        DI: { ElementRef: { optional: true } },
        props: { class: {} },
        module: 'CommonModule'
    };
    return ClassDirective;
}();
var capitalizeFilter = function () {
    'use strict';
    function capitalizeFilter() {
        this.compile = function (value) {
            return value.charAt(0).toUpperCase() + value.substr(1, value.length);
        };
    }
    capitalizeFilter.annotations = { name: 'capitalize' };
    return capitalizeFilter;
}();
var NumberFilter = function () {
    'use strict';
    function NumberFilter() {
        function format(n, x, s, c) {
            if (!!window.Intl) {
                var numFormat = new Intl.NumberFormat(navigator.language);
                return numFormat.format(this);
            } else {
                var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')', num = this.toFixed(Math.max(0, ~~n));
                return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
            }
        }
        this.compile = function (value, factoRize) {
            if (!isarray(factoRize)) {
                factoRize = [
                    factoRize,
                    3,
                    ',',
                    '.'
                ];
            }
            return format.apply(value || 0, factoRize);
        };
    }
    NumberFilter.annotations = { name: 'number' };
    return NumberFilter;
}();
var CurrencyFilter = function () {
    'use strict';
    function CurrencyFilter(numberFilter) {
        this.compile = function (value, style) {
            if (!!window.Intl) {
                var currencyFormat = new Intl.NumberFormat(window.navigator.language, style);
                return currencyFormat.format(value);
            } else {
                return (style && style.currency) + numberFilter.format(value);
            }
        };
    }
    CurrencyFilter.annotations = {
        name: 'currency',
        DI: { NumberFilter: { factory: NumberFilter } }
    };
    return CurrencyFilter;
}();
var jsonFilterFn = function () {
    'use strict';
    function jsonFilterFn() {
        this.compile = function (value, spacing) {
            return typeof value === 'object' ? JSON.stringify(value, null, parseInt(spacing || '0')) : value;
        };
    }
    jsonFilterFn.annotations = { name: 'json' };
    return jsonFilterFn;
}();
var lowerCaseFilter = function () {
    'use strict';
    function lowerCaseFilter() {
        this.compile = function (value) {
            return value.toLowerCase();
        };
    }
    lowerCaseFilter.annotations = { name: 'lowercase' };
    return lowerCaseFilter;
}();
var orderByFilterFn = function () {
    'use strict';
    function orderByFilterFn() {
        this.compile = function (value, propertyName) {
            if (value.length < 2) {
                return value;
            }
            var _queryApi = new QueryFactory(value), newList;
            var splitedProps = propertyName.split(':');
            if (splitedProps.length > 1) {
                reverse = splitedProps.pop();
            }
            propertyName = splitedProps.pop();
            newList = _queryApi.sortBy.apply(_queryApi, propertyName.split(','));
            if (reverse) {
                return newList.reverse();
            }
            return value;
        };
    }
    orderByFilterFn.annotations = { name: 'orderBy' };
    return orderByFilterFn;
}();
var upperCaseFilter = function () {
    'use strict';
    function upperCaseFilter() {
        this.compile = function (value) {
            return value.toUpperCase();
        };
    }
    upperCaseFilter.annotations = { name: 'uppercase' };
    return upperCaseFilter;
}();
var QueryFactory = function () {
    'use strict';
    function QueryFactory(data) {
        this.sortBy = function () {
            var sortArguments = arguments;
            if (isarray(data) && isobject(data[0])) {
                return data.sort(function (obj1, obj2) {
                    var props = sortArguments, i = 0, result = 0, numberOfProperties = props.length, compare = _compare(obj1, obj2);
                    while (result === 0 && i < numberOfProperties) {
                        result = compare(props[i]);
                        i++;
                    }
                    return result;
                });
            }
            function _compare(a, b) {
                var sortOrder = 1;
                return function (property) {
                    var result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
                    return result * sortOrder;
                };
            }
            return data;
        };
        return this;
    }
    ;
    QueryFactory.annotations = { name: 'query' };
    return QueryFactory;
}();
var whereFilterFn = function () {
    'use strict';
    function whereFilterFn() {
        this.compile = function (model, query) {
            return new QueryFactory(model).where(query);
        };
    }
    whereFilterFn.annotations = { name: 'whereFilter' };
    return whereFilterFn;
}();
var nativeTimeout = window.setTimeout;
var nativeClearTimeout = window.clearTimeout;
var nativeInterval = window.setInterval;
var nativeClearInterval = window.clearInterval;
window.setTimeout = function (fn, timer, detectChanges) {
    return nativeTimeout(trigger(fn, detectChanges), timer);
};
window.clearTimeout = function (timeoutID) {
    nativeClearTimeout(timeoutID);
};
window.clearInterval = function (intervalID) {
    nativeClearInterval(intervalID);
};
window.setInterval = function (fn, interval, detectChanges) {
    return nativeInterval(trigger(fn, detectChanges), interval);
};
function trigger(fn, detectChanges) {
    return function () {
        fn();
        if (detectChanges) {
            CoreBootstrapContext.detectChanges();
        }
    };
}
;
var TimeoutService = function () {
    'use strict';
    function TimeoutService() {
        return function (cb, timer) {
            var timeout = nativeTimeout(trigger(cb, true), timer);
            return function () {
                clearTimeout(timeout);
            };
        };
    }
    TimeoutService.annotations = { name: '$timeout' };
    return TimeoutService;
}();
var IntervalService = function () {
    'use strict';
    function IntervalService() {
        return function (cb, timer) {
            var interval = nativeInterval(trigger(cb, true), timer);
            return function () {
                clearInterval(interval);
            };
        };
    }
    IntervalService.annotations = { name: '$interval' };
    return IntervalService;
}();
var CommonModule = function () {
    'use strict';
    function CommonModule() {
    }
    CommonModule.annotations = {
        services: [
            NumberFilter,
            capitalizeFilter,
            jsonFilterFn,
            upperCaseFilter,
            lowerCaseFilter,
            orderByFilterFn,
            whereFilterFn,
            CurrencyFilter,
            TimeoutService,
            IntervalService,
            QueryFactory
        ],
        selectors: [
            ForDirective,
            IncludeDirective,
            IfDirective,
            SelectDirective,
            ClassDirective,
            SwitchDirective,
            SwitchCaseDirective,
            SwitchDefaultDirective
        ]
    };
    return CommonModule;
}();
exports.CommonModule = CommonModule;
exports.ForDirective = ForDirective;
exports.IncludeDirective = IncludeDirective;
exports.IfDirective = IfDirective;
exports.SelectDirective = SelectDirective;
exports.SwitchDirective = SwitchDirective;
exports.SwitchCaseDirective = SwitchCaseDirective;
exports.SwitchDefaultDirective = SwitchDefaultDirective;
exports.ClassDirective = ClassDirective;
exports.capitalizeFilter = capitalizeFilter;
exports.CurrencyFilter = CurrencyFilter;
exports.NumberFilter = NumberFilter;
exports.jsonFilterFn = jsonFilterFn;
exports.lowerCaseFilter = lowerCaseFilter;
exports.orderByFilterFn = orderByFilterFn;
exports.upperCaseFilter = upperCaseFilter;
exports.whereFilterFn = whereFilterFn;
exports.QueryFactory = QueryFactory;
exports.TimeoutService = TimeoutService;
exports.IntervalService = IntervalService;
},
'dist/core/bundles/jeli-core-module.js': function(exports){
var utils = __required('node_modules/js-helpers/utils.js');
var simpleBooleanParser = utils['simpleBooleanParser'];
var copy = utils['copy'];
var hashcode = utils['hashcode'];
var helpers = __required('node_modules/js-helpers/helpers.js');
var isnumber = helpers['isnumber'];
var isnull = helpers['isnull'];
var isundefined = helpers['isundefined'];
var isboolean = helpers['isboolean'];
var isobject = helpers['isobject'];
var inarray = helpers['inarray'];
var isstring = helpers['isstring'];
var isequal = helpers['isequal'];
var isarray = helpers['isarray'];
var isfunction = helpers['isfunction'];
function errorBuilder(error, logLevel) {
    var loggerLevel = void 0 == logLevel ? 0 : logLevel;
    var logLevelMethods = [
        'error',
        'warn',
        'info',
        'log',
        'debug'
    ];
    function userException() {
        this.name = 'jEliException';
        this.message = error;
    }
    userException.prototype.toString = function () {
        return this.name + ': "' + this.message + '"';
    };
    if (typeof error == 'string') {
        throw new userException(error);
    } else {
        console[logLevelMethods[loggerLevel]](error);
    }
}
function closureRef(closureRefFn) {
    if (isfunction(closureRefFn)) {
        closureRefFn.__ref__ = closureRef;
    }
    return closureRefFn;
}
function resolveClosureRef(ref) {
    if (isfunction(ref) && ref.__ref__ === closureRef) {
        console.log(ref);
    } else {
        return ref;
    }
}
;
function ProviderToken(tokenName, multiple) {
    var _registries = [];
    this.name = tokenName;
    this.register = function (value) {
        _registries.push(value);
    };
    this.resolve = function () {
        var token = null;
        if (multiple) {
            token = _registries;
        } else {
            token = _registries.pop();
        }
        _registries = [];
        return token;
    };
}
function Inject(factory, resolver) {
    if (isstring(factory)) {
        if (resolver && resolver.hasOwnProperty(factory)) {
            return resolver[factory];
        }
    } else if (isfunction(factory)) {
        var instance = factory.annotations.instance;
        if (!instance) {
            instance = AutoWire(resolveClosureRef(factory), resolver);
            if (!factory.annotations.noSingleton) {
                factory.annotations.instance = instance;
            }
        }
        return instance;
    } else if (factory instanceof ProviderToken) {
        return factory.resolve();
    }
    return null;
}
;
function AutoWire(factory, locals, callback) {
    if (isfunction(factory)) {
        var nArg = [];
        if (factory.annotations.DI) {
            for (var serviceName in factory.annotations.DI) {
                var doInject = factory.annotations.DI[serviceName];
                var injectableParam = null;
                try {
                    injectableParam = Inject(doInject.factory || serviceName, locals, factory.module);
                } catch (e) {
                    console.error(e);
                } finally {
                    if (!injectableParam && !doInject.optional) {
                        throw new Error('Unable to resolve provider ' + serviceName);
                    }
                }
                nArg.push(injectableParam);
            }
        }
        var protos = Object.create(factory.prototype);
        var result = factory.apply(protos, nArg);
        if (isfunction(callback)) {
            return callback(result ? result : protos);
        }
        return result ? result : protos;
    }
    return factory;
}
;
function ElementCompiler(ctrl, elementRef, localInjectors, next) {
    var definition = ctrl.annotations, hasTwoWayBinding = elementRef.props && definition.props, lifeCycle;
    function CoreComponentCompiler(componentInstance) {
        if (!elementRef.isc) {
            return;
        }
        var componentRef = componentDebugContext.get(elementRef.refId);
        componentRef.componentInstance = componentInstance;
        if (hasTwoWayBinding) {
        }
        if (ctrl.view) {
            var template = ctrl.view.getView(elementRef);
            try {
                elementRef.appendChild(template);
            } catch (e) {
                errorBuilder(e);
            } finally {
                buildViewChild(componentInstance, elementRef, definition.viewChild);
                lifeCycle.trigger('viewDidLoad');
            }
        }
        elementRef.observer(function () {
            lifeCycle.trigger('viewDidDestroy');
            componentRef.destroy();
            lifeCycle = null;
            componentRef = null;
        });
        _MutationObserver(elementRef.nativeNode || elementRef.nativeElement, function () {
            if (elementRef.nativeElement) {
                elementRef.remove();
            }
        });
        componentRef.changeDetector.detectChanges();
    }
    function compileEventsRegistry(componentInstance) {
        if (definition.events) {
            Object.keys(definition.events).forEach(_registry);
        }
        function _registry(evName) {
            switch (definition.events[evName].type) {
            case 'event':
                ComponentEventHandler(evName, componentInstance);
                break;
            case 'emitter':
                AttachEventEmitter(evName, componentInstance);
                break;
            case 'dispatcher':
                AttachEventDispatcher(evName, componentInstance);
                break;
            }
        }
    }
    function ComponentEventHandler(eventName, componentInstance) {
        elementRef.events.add({
            name: eventName,
            handler: function (event) {
                return EventHandler._executeEventsTriggers(definition.events[eventName].value, componentInstance, null, event);
            }
        });
    }
    function AttachEventDispatcher(eventName, componentInstance) {
        var options = definition.events[eventName];
        var registeredEvent = elementRef.getEvent(options.name.toLowerCase());
        var context = null;
        if (registeredEvent && registeredEvent.value.length) {
            context = elementRef.context;
            if (elementRef.isc) {
                context = elementRef.parent.context;
            }
            var methodName = registeredEvent.value[0].fn;
            context[methodName] = function eventHandler(value) {
                EventHandler._executeEventsTriggers(options.value, componentInstance, null, value);
                elementRef.parent.changeDetector.detectChanges();
            };
        }
    }
    function AttachEventEmitter(eventName, componentInstance) {
        var registeredEvent = elementRef.events.getEvent(eventName);
        if (registeredEvent && registeredEvent.value) {
            componentInstance[eventName].subscribe(eventHandler);
            elementRef.observer(function () {
                componentInstance[eventName].destroy();
            });
        }
        function eventHandler(value) {
            EventHandler._executeEventsTriggers(registeredEvent.value, elementRef.parent.componentInstance, null, value);
            elementRef.parent.changeDetector.detectChanges();
        }
    }
    function registerDirectiveInstance(componentInstance) {
        if (!elementRef.isc) {
            elementRef.nodes.set(definition.selector, componentInstance[ctrl.annotations.exportAs] || componentInstance);
            var unsubscribe = SubscribeObservables(elementRef.hostRef.refId, function () {
                lifeCycle.trigger('willObserve');
            });
            elementRef.observer(function () {
                lifeCycle.trigger('viewDidDestroy');
                elementRef.nodes.delete(definition.selector);
                lifeCycle = null;
                unsubscribe();
            });
        }
    }
    function Linker(componentInstance) {
        var always = false;
        if (definition.props) {
            always = _updateViewBinding();
            if (always) {
                elementRef.observer(SubscribeObservables(elementRef.parent.refId, _updateViewBinding));
            }
        }
        function _updateViewBinding() {
            var hasBinding = false;
            for (var prop in definition.props) {
                var item = definition.props[prop];
                var name = item.value || prop;
                if (elementRef.props && elementRef.props.hasOwnProperty(name)) {
                    hasBinding = true;
                    if (item.ignoreChanges) {
                        return;
                    }
                    switch (item.type) {
                    case 'TemplateRef':
                        componentInstance[prop] = elementRef.getTemplateRef(name);
                        break;
                    default:
                        var value = evaluateExpression(elementRef.props[name], elementRef.context);
                        componentInstance[prop] = value;
                        break;
                    }
                } else {
                    if (isequal(item.value, 'jModel')) {
                        componentInstance[prop] = elementRef.nodes.get('model');
                    } else {
                        componentInstance[prop] = elementRef.getAttribute(name);
                    }
                }
            }
            lifeCycle.trigger('willObserve');
            return hasBinding;
        }
    }
    ComponentFactoryInitializer(ctrl, localInjectors, function triggerInstance(componentInstance) {
        if (definition.registerAs) {
            definition.registerAs.register(componentInstance);
        }
        compileEventsRegistry(componentInstance);
        lifeCycle = new ElementCompiler.LifeCycle(componentInstance);
        Linker(componentInstance);
        registerDirectiveInstance(componentInstance);
        lifeCycle.trigger('didInit');
        next(componentInstance);
        CoreComponentCompiler(componentInstance);
    });
}
ElementCompiler.LifeCycle = function (componentInstance) {
    var _cycleState = {
        didInit: !!componentInstance.didInit,
        viewDidLoad: !!componentInstance.viewDidLoad,
        viewDidMount: !!componentInstance.viewDidMount,
        viewDidDestroy: !!componentInstance.viewDidDestroy,
        willObserve: !!componentInstance.willObserve,
        didChanged: !!componentInstance.didChanged
    };
    this.trigger = function (cycle) {
        if (this.has(cycle)) {
            componentInstance[cycle]();
        }
    };
    this.has = function (cycle) {
        return _cycleState[cycle] && isfunction(componentInstance[cycle]);
    };
};
ElementCompiler.resolve = function (node, nextTick) {
    var inc = 0;
    function next() {
        var factory = node.providers[inc];
        var localInjectors = generatePublicInjectors(node);
        inc++;
        if (factory) {
            try {
                localInjectors.setAnnotations(factory.annotations);
                ElementCompiler(factory, node, localInjectors, next);
            } catch (e) {
                errorBuilder(e);
            }
        } else {
            localInjectors.destroy();
            nextTick(node);
        }
    }
    next();
};
function ComponentFactoryInitializer(ctrl, injectorInstance, CB) {
    if (ctrl.annotations.resolvers) {
        for (var i = 0; i < ctrl.annotations.resolvers.length; i++) {
            var value = Inject(ctrl.annotations.resolvers[i], injectorInstance.getProviders());
        }
    }
    AutoWire(ctrl, injectorInstance.getProviders(), function (instance) {
        try {
            CB(instance);
        } catch (e) {
            errorBuilder(e);
        }
    });
}
;
function Observer() {
    this.$notifyInProgress = 0;
    this.bindingIdx = 0;
    this.retry = false;
    this._entries = [];
    this._events = {};
    this.get = function (key) {
        return this._entries.filter(function (instance) {
            return instance.binding === key;
        })[0];
    };
    this.on = function (eventName, listener) {
        if (!this._events.hasOwnProperty(eventName)) {
            this._events[eventName] = [];
        }
        this._events[eventName].push(listener);
        return this;
    };
    this.emit = function (eventName) {
        if (this._events.hasOwnProperty(eventName)) {
            var events = this._events[eventName];
            var arg = [].splice.call(arguments);
            arg.shift();
            while (events.length) {
                var fn = this._events[eventName].pop();
                fn.apply(fn, arg);
            }
        }
    };
}
Observer.prototype.unsubscribe = function (bindingIdx) {
    this._entries = this._entries.filter(function (instance) {
        return instance.binding !== bindingIdx;
    });
    if (this.$notifyInProgress) {
        this.$notifyInProgress--;
    }
};
Observer.prototype.subscribe = function (key, fn, core) {
    var self = this, bindingIdx = fn ? key : 'core_' + ++this.bindingIdx;
    this.retry = true;
    this._entries.push({
        watchKey: fn ? key : undefined,
        handler: fn || key,
        state: false,
        core: core,
        binding: bindingIdx
    });
    return function () {
        self.unsubscribe(bindingIdx);
    };
};
Observer.prototype.observeForKey = function (key, fn, core) {
    var keyObserver = this.get(key), index = 0, unsubscribe = null;
    if (!keyObserver) {
        unsubscribe = this.subscribe(key, [fn], core);
    } else {
        index = keyObserver.length;
        keyObserver.handler.push(fn);
    }
    return function () {
        if (!index) {
            unsubscribe();
        } else {
            keyObserver.handler.splice(index, 1);
        }
    };
};
Observer.prototype.notifyAllObservers = function (model, ignoreCheck) {
    if (this.$notifyInProgress) {
        this.retry = true;
        return;
    }
    var _self = this;
    function _consume(observer, idx) {
        if (!_self.$notifyInProgress) {
            return;
        }
        if (observer.watchKey) {
            if (model) {
                var value;
                if (isfunction(observer.watchKey)) {
                    value = observer.watchKey(model);
                } else {
                    value = resolveValueFromContext(observer.watchKey, model);
                }
                if (observer.core && isfunction(observer.core)) {
                    if (observer.core(value)) {
                        _trigger(observer.handler, value);
                    }
                } else if (ignoreCheck || _comparison(value, observer)) {
                    _trigger(observer.handler, value);
                }
            }
        } else {
            observer.handler(model);
        }
        if (isequal(idx + 1, _self.$notifyInProgress)) {
            _self.$notifyInProgress = 0;
            if (_self.retry) {
                _self.retry = false;
                _self.notifyAllObservers(model);
            }
        }
    }
    function _trigger(handlers, value) {
        if (isobject(handlers)) {
            handlers.forEach(function (cb) {
                cb(value);
            });
        } else {
            handlers(value);
        }
    }
    function _comparison(value, Observer) {
        if (isobject(value)) {
            value = hashcode(JSON.stringify(value));
        }
        var noChanges = !isequal(value, Observer.lastValue);
        Observer.lastValue = value;
        return noChanges;
    }
    this.$notifyInProgress = this._entries.length;
    for (var i = 0; i < this.$notifyInProgress; i++) {
        _consume(this._entries[i], i);
    }
};
Observer.prototype.destroy = function (value) {
    this._entries.length = 0;
    this.emit('$destroy', value);
    this.notifyAllObservers = 0;
    this.retry = false;
    this._events = null;
};
function InternalChangeDetector(tick) {
    var _changeDetectorState = 3;
    this.detectChanges = function () {
        tick.apply(null, arguments);
    };
    this.markAsChecked = function () {
        _changeDetectorState = 1;
    };
    this.markAsUnChecked = function () {
        _changeDetectorState = 3;
    };
    this.markAsOnce = function () {
        _changeDetectorState = 2;
    };
    Object.defineProperty(this, 'status', {
        get: function () {
            return _changeDetectorState;
        }
    });
}
var componentDebugContext = new Map();
function ComponentRef(refId) {
    var _this = this;
    this.componentRefId = refId;
    this.observables = new Observer();
    this.child = [];
    this.parent = null;
    this.changeDetector = new InternalChangeDetector(tick);
    this.componentInstance = null;
    this._context = null;
    Object.defineProperty(this, 'context', {
        get: function () {
            if (this._context) {
                return this._context;
            }
            return this.componentInstance;
        }
    });
    function tick(ignoreChild, ignoreParent) {
        if (!_this.observables || _this.inProgress) {
            return;
        }
        _this.inProgress = true;
        _this.observables.notifyAllObservers(_this.componentInstance);
        if (!ignoreChild) {
            triggerChild(_this.child, []);
        }
        if (_this.parent && !ignoreParent && componentDebugContext.has(_this.parent)) {
            var parent = componentDebugContext.get(_this.parent);
            parent.changeDetector.detectChanges(true);
            triggerChild(parent.child, [_this.componentRefId]);
        }
        function triggerChild(children, ignore) {
            children.forEach(function (childRef) {
                if (!inarray(childRef, ignore)) {
                    var child = componentDebugContext.get(childRef);
                    child.changeDetector.detectChanges(false, true);
                }
            });
        }
        _this.inProgress = false;
    }
    ;
}
ComponentRef.prototype.removeChild = function (refId) {
    this.child.slice(this.child.indexOf(refId), 1);
    componentDebugContext.delete(refId);
};
ComponentRef.prototype.updateModel = function (propName, value) {
    setModelValue(propName, this.context, value);
    this.changeDetector.detectChanges(false, true);
    return this;
};
ComponentRef.prototype.new = function (refId) {
    var childInstance = new ComponentRef(refId);
    childInstance.parent = this;
    this.child.push(refId);
    return childInstance;
};
ComponentRef.prototype.destroy = function () {
    componentDebugContext.delete(this.componentRefId);
    this.observables.destroy();
    this.changeDetector = null;
    this.observables = null;
    this.parent = null;
    this.child.length = 0;
    if (this.parent) {
        this.parent.removeChild(this.componentRefId);
    }
};
ComponentRef.create = function (refId, parentId) {
    var componentRef = new ComponentRef(refId);
    if (parentId) {
        componentRef.parent = parentId;
    }
    componentDebugContext.set(refId, componentRef);
    componentRef = null;
};
function ChangeDetector() {
    CoreBootstrapContext.bootStrapComponent.context.tick();
}
;
function SubscribeObservables(refId, fn, attachDestroy) {
    var componentRef = componentDebugContext.get(refId);
    var unsubscribe = null;
    if (componentRef) {
        unsubscribe = componentRef.observables.subscribe(fn);
        if (attachDestroy) {
            componentRef.observables.on('$destroy', unsubscribe);
        }
    }
    return unsubscribe;
}
function generatePublicInjectors(elementRef) {
    var injectors = {};
    var currentClassAnnotations = {};
    Object.defineProperties(injectors, {
        ElementRef: {
            get: function () {
                return elementRef;
            }
        },
        TemplateRef: {
            get: function () {
                return this.ElementRef.getTemplateRef(currentClassAnnotations.selector);
            }
        },
        changeDetector: {
            get: function () {
                return this.ElementRef.changeDetector;
            }
        },
        ViewRef: {
            get: function () {
                return new ViewRef(this.ElementRef);
            }
        },
        ParentRef: {
            get: function () {
                return this.ElementRef.parent.nodes.get(currentClassAnnotations.DI.ParentRef.value) || this.ElementRef.parent.componentInstance;
            }
        },
        VALIDATORS: {
            get: function () {
                var _this = this;
                return [
                    'required',
                    'pattern',
                    'minlength',
                    'maxlength'
                ].reduce(function (accum, key) {
                    if (_this.ElementRef.hasAttribute(key)) {
                        accum[key] = _this.ElementRef.getAttribute(key);
                    }
                    return accum;
                }, {});
            }
        }
    });
    return {
        setAnnotations: function (annotations) {
            currentClassAnnotations = annotations;
        },
        getProviders: function () {
            return injectors;
        },
        destroy: function () {
            injectors = null;
            currentClassAnnotations = null;
            elementRef = null;
        },
        extend: function (token, value) {
            console.log(token, value);
        }
    };
}
function buildViewChild(componentInstance, elementRef, viewChild) {
    elementRef.viewQuery.render(assignValue);
    function assignValue(item) {
        var option = viewChild[item.key];
        if (option.type) {
            switch (option.type.toLowerCase()) {
            case 'querylist':
                if (!componentInstance.hasOwnProperty(option.name)) {
                    componentInstance[option.name] = new QueryList();
                }
                componentInstance[option.name].add(item.value);
                break;
            case 'jmodel':
                componentInstance[option.name] = item.value.nodes.get(option.value);
                break;
            case 'elementref':
                componentInstance[option.name] = item.value;
                break;
            }
        } else if (option.isdir) {
            componentInstance[option.name] = item.value.nodes.get(option.value);
        } else {
            componentInstance[option.name] = item.value.componentInstance;
        }
    }
}
function createLocalVariables(localVariables, componentContext) {
    var context = {};
    if (localVariables) {
        for (var propName in localVariables) {
            if (localVariables[propName].match(/\s/)) {
                context[propName] = localVariables[propName];
            } else if (componentContext) {
                context[propName] = evaluateExpression(localVariables[propName], componentContext);
            }
        }
    }
    return context;
}
function setupAttributeObservers(element, attrObservers) {
    var observerStarted = false;
    element.observer(SubscribeObservables(element.hostRef.refId, observe));
    function observe() {
        for (var propName in attrObservers) {
            if (attrObservers[propName].once && observerStarted) {
                break;
            }
            attributeEvaluator(propName, attrObservers[propName]);
        }
        function attributeEvaluator(propName, template) {
            compileTemplate(template, element.context, function (value) {
                if (AttributeAppender[propName]) {
                    AttributeAppender[propName](element.nativeElement, value, template);
                } else {
                    element.setProp(propName, value, true);
                }
            });
        }
        observerStarted = true;
    }
}
var $eUID = 1;
var CoreBootstrapContext = {
    bootStrapComponent: null,
    compiledModule: null,
    $isCompiled: false,
    $isAfterBootStrap: false,
    enableDebugger: true
};
function getUID() {
    return 'jeli:' + +new Date() + ':' + $eUID++;
}
var INITIALIZERS = new ProviderToken('AppInitializers', true);
function bootStrapApplication(moduleToBootStrap) {
    CoreBootstrapContext.compiledModule = moduleToBootStrap;
    InitializeModule(moduleToBootStrap);
    CoreBootstrapContext.$isCompiled = true;
    bootStrapElement();
    function bootStrapElement() {
        if (moduleToBootStrap.annotations.rootElement) {
            var selector = moduleToBootStrap.annotations.rootElement.annotations.selector;
            CoreBootstrapContext.bootStrapComponent = new ElementRef({
                name: selector,
                isc: true,
                type: 'element',
                fromDOM: true,
                providers: [moduleToBootStrap.annotations.rootElement]
            }, null);
            ElementCompiler.resolve(CoreBootstrapContext.bootStrapComponent, function () {
            });
        }
    }
    function InitializeModule(moduleFn) {
        moduleFn();
        if (moduleFn.annotations.requiredModules) {
            moduleFn.annotations.requiredModules.forEach(InitializeModule);
        }
    }
}
;
function ViewParser(transpiledHTML, templates, providers) {
    var _viewContainer = [];
    this.getView = function (parent) {
        for (var i = 0; i < transpiledHTML.length; i++) {
            var compiled = ViewParserHelper[transpiledHTML[i].type](transpiledHTML[i], parent, this);
            if (compiled) {
                _viewContainer.push(compiled);
            }
        }
        return toFragment(_viewContainer, parent);
    };
    this.getProvider = function (provide) {
        return providers[provide];
    };
    this.pushToView = function (element) {
        _viewContainer.push(element);
    };
    this.getTemplate = function (templateRefId) {
        if (templates.hasOwnProperty(templateRefId)) {
            return templates[templateRefId];
        }
        errorBuilder('unable to find template [' + templateRefId + ']');
    };
}
;
function element(definition, parent, viewContainer) {
    var elementRef = new ElementRef(definition, parent);
    if (definition.attr) {
        AttributeAppender(elementRef.nativeElement, definition.attr);
    }
    if (definition.children) {
        for (var i = 0; i < definition.children.length; i++) {
            var child = ViewParserHelper[definition.children[i].type](definition.children[i], elementRef, viewContainer, true);
            if (child) {
                elementRef.children.add(child);
                elementRef.nativeElement.appendChild(child.nativeElement || child.nativeNode);
            }
        }
    }
    if (definition.vc) {
        elementRef.hostRef.viewQuery.add(definition.vc, elementRef);
    }
    return elementRef;
}
;
function text(definition, parent) {
    return new TextNodeRef(copy(definition), parent);
}
;
function place(definition, parent, viewContainer, appendToChild) {
    var hostRef = parent.hostRef;
    var templates = hostRef.getTemplateRef('place');
    if (definition.selector) {
        templates = templates.selector(definition.selector);
    }
    templates.forEach(function (template) {
        var child = ViewParserHelper[template.type](template, parent, viewContainer);
        if (appendToChild) {
            parent.children.add(child);
            parent.nativeElement.appendChild(child.nativeElement || child.nativeNode);
        } else {
            viewContainer.pushToView(child);
        }
    });
    return null;
}
;
function outlet(definition, parent, viewContainer) {
    var template = definition.template;
    if (!template && parent.hostRef) {
        template = parent.hostRef.templates[definition.templateId];
    }
    if (template) {
        var element = ViewParserHelper.element(template, parent, viewContainer);
        element.context = context;
        return element;
    }
    return null;
}
;
function toFragment(compiledTemplate, parent) {
    var fragment = document.createDocumentFragment();
    while (compiledTemplate.length) {
        processCompiler(compiledTemplate.shift());
    }
    function processCompiler(compiled) {
        if (!compiled) {
            return;
        }
        parent.children.add(compiled);
        fragment.appendChild(compiled.nativeElement || compiled.nativeNode);
        transverse(compiled);
    }
    return fragment;
}
;
function transverse(node) {
    if (node instanceof ElementRef) {
        if (node.providers && node.providers.length) {
            ElementCompiler.resolve(node, proceedWithCompilation);
        } else {
            proceedWithCompilation(node);
        }
    } else if (node instanceof TextNodeRef && node.hasBinding) {
        node.render();
    }
    function proceedWithCompilation(node) {
        node.events.registerListener();
        node.children.forEach(transverse);
    }
}
var ViewParserHelper = {
    element: element,
    text: text,
    place: place,
    outlet: outlet
};
var sce = function () {
    var element = document.createElement('div');
    function htmlEscape(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    ;
    function decodeHTMLEntities(str) {
        if (str && typeof str === 'string') {
            str = htmlEscape(str).replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '').replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '').replace(/^[ \n\r\t\f]+/, '').replace(/[ \n\r\t\f]+$/, '');
            element.innerHTML = str;
            str = element.textContent;
            element.textContent = '';
        }
        return str;
    }
    return {
        trustAsHTML: decodeHTMLEntities,
        escapeHTML: htmlEscape,
        isPlainHtml: /<[a-z][\s\S]*>/i
    };
}();
function TemplateRef(templates, templateId) {
    if (!templates || !templates.hasOwnProperty(templateId)) {
        errorBuilder('No templates Defined #' + templateId);
    }
    this.createElement = function (parentNode) {
        return ViewParserHelper[templates[templateId].type](templates[templateId], parentNode);
    };
    this.getContext = function () {
        return templates[templateId].context;
    };
    this.forEach = function (callback) {
        return templates[templateId].forEach(callback);
    };
    this.querySelector = function (selector) {
        return templates[templateId].filter(_selector);
        function _selector(template) {
            switch (selector[0]) {
            case 'id':
            case 'class':
                return template.attr && inarray(template.attr[selector[0]], selector[1]);
            default:
                return isequal(selector[1], template.name);
            }
        }
    };
}
function ViewRef(elementRef) {
    this._destroyed = false;
    this.createEmbededView = function (templateRef) {
        var compiledElement = templateRef.createElement(elementRef);
        var templateContext = templateRef.getContext();
        var _componentRef = null;
        elementRef.children.add(compiledElement);
        transverse(compiledElement);
        elementRef.insertAfter(compiledElement.nativeElement, (elementRef.children.last || elementRef).nativeElement);
        compiledElement.changeDetector.detectChanges();
        return {
            removeView: function () {
                if (templateContext && _componentRef) {
                    _componentRef.destroy();
                    templateContext = null;
                    _componentRef = null;
                }
                compiledElement.remove(true);
                compiledElement = null;
            },
            setContext: function (context) {
                if (templateContext) {
                    var localVariables = createLocalVariables(templateContext, context);
                    ComponentRef.create(compiledElement.refId, compiledElement.parent && compiledElement.parent.refId);
                    _componentRef = componentDebugContext.get(compiledElement.refId);
                    _componentRef._context = localVariables;
                }
                compiledElement.changeDetector.detectChanges();
            },
            updateContext: function (updates) {
                if (templateContext) {
                    var componentRef = componentDebugContext.get(compiledElement.refId);
                    for (var prop in updates) {
                        componentRef.updateModel(prop, updates[prop]);
                    }
                }
                compiledElement.changeDetector.detectChanges();
            }
        };
    };
    this.clearView = function () {
        elementRef.children.destroy();
    };
}
function ElementStyle(nativeElement, name, value) {
    if (name && !value && isstring(name)) {
        if (!!window.getComputedStyle) {
            var ret = window.getComputedStyle(nativeElement)[name];
            return parseInt(ret) || ret;
        }
        return;
    }
    if (isobject(name)) {
        for (var prop in name) {
            ElementStyle.set(nativeElement, prop, name[prop]);
        }
    } else {
        ElementStyle.set.apply(null, arguments);
    }
}
;
ElementStyle.set = function (nativeElement, name, value, suffix) {
    if (inarray(name, [
            'width',
            'height',
            'top',
            'bottom',
            'left',
            'right'
        ]) && typeof value === 'number') {
        value += suffix || 'px';
    }
    nativeElement.style[name] = value;
};
function ElementClassList(nativeElement, classList, type) {
    if (type) {
        nativeElement.classList[type].apply(nativeElement.classList, classList.split(' '));
    } else if (classList) {
        nativeElement.classList.value = classList;
    } else {
        return nativeElement.classList.value;
    }
}
ElementClassList.add = function (nativeElement, classList, removeClass) {
    if (!classList) {
        return;
    }
    if (isobject(classList)) {
        for (var className in classList) {
            if (isstring(classList[className])) {
                nativeElement.classList.toggle(className, classList[className]);
            }
        }
    } else {
        nativeElement.classList.toggle(classList, removeClass);
    }
};
ElementClassList.contains = function (nativeElement, className) {
    return nativeElement.classList.contains(className);
};
function AttributeAppender(nativeElement, prop, value) {
    if (isobject(prop)) {
        for (var name in prop) {
            nativeElement.setAttribute(name, prop[name]);
        }
    } else {
        nativeElement.setAttribute(prop, value);
    }
}
AttributeAppender.style = function (nativeElement, value, template) {
    if (isobject(value)) {
        ElementStyle(nativeElement, value);
    } else {
        ElementStyle.set(nativeElement, template.props, value, template.suffix);
    }
};
AttributeAppender.innerhtml = function (nativeElement, value) {
    nativeElement.innerHTML = sce.trustAsHTML(value);
};
AttributeAppender.src = function (nativeElement, value) {
    if (!isarray(nativeElement.tagName, [
            'IMG',
            'IFRAME'
        ])) {
        errorBuilder('src is not a valid property of ' + nativeElement.tagName);
    }
    nativeElement.setAttribute('src', value);
};
AttributeAppender.href = function (nativeElement, value) {
    if (!isequal('A', nativeElement.tagName)) {
        errorBuilder('href is not a valid property of ' + nativeElement.nativeElement.tagName);
    }
    nativeElement.setAttribute('href', value);
};
AttributeAppender.class = function (nativeElement, value) {
    ElementClassList.add(nativeElement, value);
};
AttributeAppender.checked = function (nativeElement, isChecked) {
    _optionalType(nativeElement, isChecked, 'checked');
};
AttributeAppender.selected = function (nativeElement, isChecked) {
    _optionalType(nativeElement, isChecked, 'selected');
};
function _optionalType(nativeElement, isSelected, type) {
    nativeElement[isSelected ? 'setAttribute' : 'removeAttribute'](type, isSelected);
    nativeElement[type] = isSelected;
}
function ElementRef(definition, parent) {
    var viewQuery = null;
    var _this = this;
    definition.events = definition.events || [];
    definition.attr = definition.attr || {};
    this.nativeElement = ElementRef.createElementByType(definition.name, definition.text, definition.fromDOM);
    this.refId = getUID();
    this.$observers = [];
    this.children = new QueryList();
    this.parent = parent;
    if (definition.isc) {
        ComponentRef.create(this.refId, parent && parent.refId);
        viewQuery = Object.create({
            ϕelements: [],
            add: function (option, element) {
                if (!isequal(option[1], _this.tagName)) {
                    return _this.parent && _this.parent.hostRef.viewQuery.add(option, element);
                }
                this.ϕelements.push({
                    key: option[0],
                    value: element
                });
            },
            render: function (callback) {
                while (this.ϕelements.length) {
                    callback(this.ϕelements.pop());
                }
                this.ϕelements.length = 0;
            }
        });
    }
    this.nodes = new Map();
    this.events = new EventHandler(this, definition.events);
    Object.defineProperties(this, {
        index: {
            get: function () {
                return definition.index;
            }
        },
        value: {
            get: function () {
                return ElementRefGetValue(this);
            }
        },
        nativeNode: {
            get: function () {
                return isequal(this.nativeElement.nodeType, 8) ? ele : null;
            }
        },
        type: {
            get: function () {
                return definition.type;
            }
        },
        tagName: {
            get: function () {
                return definition.name.toLowerCase();
            }
        },
        attr: {
            get: function () {
                return definition.attr;
            }
        },
        props: {
            get: function () {
                return definition.props;
            }
        },
        context: {
            get: function () {
                if (componentDebugContext.has(this.refId)) {
                    return componentDebugContext.get(this.refId).context;
                }
                return this.parent && this.parent.context;
            }
        },
        componentInstance: {
            get: function () {
                if (componentDebugContext.has(this.refId)) {
                    return componentDebugContext.get(this.refId).componentInstance;
                }
                return this.parent && this.parent.componentInstance;
            }
        },
        hostRef: {
            get: function () {
                if (definition.isc) {
                    return this;
                }
                return this.parent.hostRef;
            }
        },
        viewQuery: {
            get: function () {
                return viewQuery || this.parent.viewQuery;
            }
        },
        isc: {
            get: function () {
                return definition.isc;
            }
        },
        changeDetector: {
            get: function () {
                if (componentDebugContext.has(this.refId)) {
                    return componentDebugContext.get(this.refId).changeDetector;
                }
                return this.parent && this.parent.changeDetector;
            }
        },
        providers: {
            get: function () {
                return definition.providers;
            }
        }
    });
    this.getTemplateRef = function (templateId) {
        return new TemplateRef(definition.templates, templateId);
    };
    if (definition.attrObservers) {
        setupAttributeObservers(this, definition.attrObservers);
    }
}
ElementRef.prototype.getChildByRef = function (refId) {
    return this.children.find(function (element) {
        return isequal(element.refId, refId);
    });
};
ElementRef.prototype.nextSibling = function () {
    return this.parent && this.parent.children.findByIndex(this.index + 1);
};
ElementRef.prototype.prevSibling = function () {
    return this.parent && this.parent.children.findByIndex(this.index - 1);
};
ElementRef.prototype.setProp = function (propName, propValue) {
    if (propValue === undefined)
        return;
    this.nativeElement[propName] = propValue;
    this.setAttribute.apply(this, arguments);
    return this;
};
ElementRef.prototype.hasAttribute = function (name) {
    return this.attr.hasOwnProperty(name);
};
ElementRef.prototype.getAttribute = function (name) {
    if (this.prop && this.prop.hasOwnProperty(name)) {
        return this.prop[name];
    }
    return this.attr && this.attr[name];
};
ElementRef.prototype.hasAnyAttribute = function (list, force) {
    var found = 0, self = this;
    list.forEach(function (attr) {
        if (self.hasAttribute(attr)) {
            found = simpleArgumentParser(self.getAttribute(attr) || force || true);
        }
    });
    return found;
};
ElementRef.prototype.setAttribute = function (name, value, attachInElement) {
    this.attr[name] = value;
    if (attachInElement && this.nativeElement) {
        this.nativeElement.setAttribute(name, value);
    }
    return this;
};
ElementRef.prototype.removeAttribute = function (name) {
    this.nativeElement && this.nativeElement.removeAttribute(name);
    delete this.attr[name];
};
ElementRef.prototype.appendChild = function (template) {
    if (template instanceof ElementRef) {
        template = template.nativeElement;
    } else if (template instanceof HTMLElement || template instanceof DocumentFragment) {
        template = template;
    }
    this.nativeElement.appendChild(template);
    this.changeDetector.detectChanges();
};
ElementRef.prototype.insertAfter = function (newNode, targetNode) {
    targetNode = targetNode || this.nativeElement;
    targetNode.parentNode.insertBefore(newNode, targetNode.nextSibling);
    this.changeDetector.detectChanges();
};
ElementRef.prototype.html = function (newContent) {
    if (newContent instanceof ElementRef) {
        newContent = newContent.nativeElement;
    } else if (isstring(newContent)) {
        newContent = document.createRange().createContextualFragment(newContent);
    }
    this.nativeElement.innerHTML = '';
    this.nativeElement.appendChild(newContent);
};
ElementRef.prototype.remove = function (removeFromParent) {
    if (this.nativeElement && this.nativeElement.nodeType != 11) {
        this.nativeElement.remove();
    }
    if (removeFromParent && this.parent) {
        this.children.remove(this);
    }
    cleanupElementRef(this);
};
ElementRef.prototype.removeChild = function (element) {
    this.children.remove(element);
    cleanupElementRef(element);
};
ElementRef.prototype.observer = function (onDestroyListener) {
    if (onDestroyListener) {
        this.$observers.push(onDestroyListener);
    }
    return this;
};
function cleanupElementRef(elementRef) {
    elementRef.events.destroy();
    while (elementRef.$observers.length) {
        elementRef.$observers.pop()();
    }
    elementRef.children.destroy();
    elementRef.nativeElement = null;
    elementRef.parent = null;
    elementRef.nodes.clear();
}
;
function ElementRefGetValue(element) {
    if (isequal(element.nativeElement.type, 'checkbox')) {
        return element.nativeElement.checked;
    } else if (isequal(element.nativeElement.localName, 'select')) {
        if (!element.children.length || element.nativeElement.options.length > element.children.length) {
            return element.nativeElement.value;
        }
        if (element.hasAttribute('multiple')) {
            var optionsValue = [];
            for (var i = 0; i < element.nativeElement.selectedOptions.length; i++) {
                var option = element.nativeElement.selectedOptions[i];
                var value = element.children.findByIndex(option.index).getAttribute('value');
                optionsValue.push(value);
            }
            return optionsValue;
        }
        return element.children.findByIndex(element.nativeElement.selectedIndex).getAttribute('value');
    } else if (element.nativeElement.type) {
        return simpleArgumentParser(element.nativeElement.value);
    }
}
;
ElementRef.createElementByType = function (tag, text, fromDOM) {
    if (fromDOM) {
        return document.querySelector(tag);
    }
    switch (tag) {
    case '#comment':
        return document.createComment(text);
    case '#fragment':
        return document.createDocumentFragment();
    default:
        return document.createElement(tag);
    }
};
function EventHandler(elementRef, events) {
    this._events = events || [];
    this.add = function (_event) {
        this._events.push(_event);
    };
    this.registeredEvents = new Map();
    Object.defineProperty(this, 'node', {
        get: function () {
            return elementRef;
        }
    });
}
EventHandler.prototype.getEvent = function (eventName) {
    return EventHandler.getEventsByType(this._events, eventName)[0];
};
EventHandler.prototype.registerListener = function () {
    if (!this._events.length) {
        return;
    }
    var _this = this;
    function jEventHandler(ev) {
        if (inarray(ev.type, [
                'submit',
                'touchstart',
                'touchend',
                'touchmove'
            ])) {
            ev.preventDefault();
        }
        try {
            EventHandler.getEventsByType(_this._events, ev.type).forEach(function (event) {
                triggerEvents(event, ev);
            });
        } catch (e) {
            errorBuilder(e);
        } finally {
            _this.node.changeDetector.detectChanges();
        }
    }
    function triggerEvents(registeredEvent, mouseEvent) {
        if (registeredEvent.handler) {
            registeredEvent.handler(mouseEvent);
        } else {
            EventHandler._executeEventsTriggers(registeredEvent.value, _this.node.hostRef.componentInstance, _this.node.context, mouseEvent);
        }
    }
    for (var i = 0; i < this._events.length; i++) {
        var event = this._events[i];
        if (!event.custom) {
            event.name.split(' ').forEach(function (eventName) {
                if (!_this.registeredEvents.has(eventName)) {
                    _this.node.nativeElement.addEventListener(eventName, jEventHandler, false);
                    _this.registeredEvents.set(eventName, function () {
                        _this.node.nativeElement.removeEventListener(eventName, jEventHandler);
                    });
                }
            });
        }
    }
};
EventHandler.prototype.destroy = function () {
    this.registeredEvents.forEach(function (removeListenerFn) {
        removeListenerFn();
    });
    this.registeredEvents.clear();
    this._events.length = [];
};
EventHandler.getEventsByType = function (events, type) {
    return events.filter(function (event) {
        return isequal(event.name, type);
    });
};
EventHandler._executeEventsTriggers = function (eventTriggers, componentInstance, context, ev) {
    eventTriggers.forEach(_dispatch);
    function _dispatch(event) {
        if (event.left) {
            parseObjectExpression(event, context || componentInstance, ev);
        } else if (event.fn) {
            var fn = EventHandler.getFnFromContext(event, componentInstance);
            var narg = generateArguments(event.args, context || componentInstance, ev);
            var ret = fn.apply(fn.context, narg);
            fn.context = null;
            fn = null;
            return ret;
        }
    }
};
EventHandler.getFnFromContext = function (eventInstance, componentInstance) {
    var instance = componentInstance;
    if (eventInstance.namespaces) {
        instance = resolveContext(eventInstance.namespaces, componentInstance);
    }
    var fn = instance[eventInstance.fn];
    if (instance instanceof Array || !componentInstance[eventInstance.fn]) {
        fn.context = instance;
    } else {
        fn.context = componentInstance;
    }
    instance = null;
    return fn;
};
function filterParser(type, context) {
    var filterFn = Inject(type);
    if (!filterFn) {
        errorBuilder(type + 'Provider was not found in FilterProvider');
    }
    return filterFn.compile.apply(filterFn, context);
}
;
function getTemplateValue(templateModel, instance) {
    var value = resolveValueFromContext(templateModel.prop, instance);
    if (templateModel.fns) {
        value = templateModel.fns.reduce(function (accum, filterName, idx) {
            var filterArgs = (templateModel.args[idx] || []).map(function (key) {
                return resolveValueFromContext(key, instance) || key;
            });
            filterArgs.unshift(accum);
            return filterParser(filterName, filterArgs);
        }, !isundefined(value) ? value : templateModel.prop);
    }
    return value;
}
function getValueFromModel(key) {
    if ($inArray('|', key)) {
        var filteredKey = removeFilters(key);
        return function (model) {
            return getTemplateValue(filteredKey, model);
        };
    } else {
        return function (model) {
            return resolveValueFromContext(key, model);
        };
    }
}
function compileTemplate(definition, context, cb) {
    var value = undefined;
    if (definition.templates) {
        value = definition.templates.reduce(function (accum, options) {
            return accum.replace(options.replace, evaluateExpression(options.exp, context));
        }, definition.rawValue);
    } else {
        value = getTemplateValue(definition, context);
    }
    cb(value);
}
function evaluateExpression(expr, context) {
    if (isobject(expr) && expr.hasOwnProperty('prop')) {
        return getTemplateValue(expr, context);
    }
    return resolveValueFromContext(expr, context);
}
;
function maskedEval(expression, context) {
    if (/([|<>=()\-!*+&\/\/:])/gi.test(expression)) {
        return new Function('with(this) { try{ return ' + expression + ' }catch(e){ return undefined; } }').call(context || {});
    } else {
        return simpleContextMapper(expression, context);
    }
}
function simpleArgumentParser(arg) {
    var booleanMatcher = simpleBooleanParser(arg), isNum = Number(arg);
    if (arg && !isNaN(isNum)) {
        return isNum;
    } else if (!isundefined(booleanMatcher)) {
        return booleanMatcher;
    }
    return arg;
}
function generateArguments(args, context, event) {
    return args.map(function (arg) {
        if (isarray(arg)) {
            var isEvent = isequal(arg[0], '$event');
            return resolveContext(arg.slice(isEvent ? 1 : 0), isEvent ? event : context);
        } else {
            if (isstring(arg)) {
                return isequal(arg, '$event') ? event : arg;
            }
            arg = arg.join('.');
            var param = resolveValueFromContext(arg, context);
            return !isundefined(param) ? param : simpleArgumentParser(arg);
        }
    });
}
function resolveValueFromContext(expression, context) {
    if (isundefined(expression) || isnull(expression) || isboolean(expression) || isnumber(expression) || /(#|rgb)/.test(expression)) {
        return expression;
    } else if (isobject(expression)) {
        return parseObjectExpression.apply(null, arguments);
    } else if (isarray(expression)) {
        return expression;
    }
    return resolveContext(generateArrayKeyType(expression, context).split('.'), context);
}
function parseObjectExpression(expression, context, event) {
    var internalParser = {
        ite: function () {
            return resolveValueFromContext(expression.test, context) ? expression.cons : expression.alt;
        },
        call: function () {
            var dcontext = context;
            if (expression.namespaces) {
                dcontext = resolveContext(expression.namespaces, context);
            }
            if (dcontext && dcontext[expression.fn]) {
                var args = generateArguments(expression.args, context, event);
                return dcontext[expression.fn].apply(dcontext, args);
            }
            return null;
        },
        obj: function () {
            if (expression.expr) {
                return Object.keys(expression.expr).reduce(function (accum, key) {
                    accum[key] = resolveValueFromContext(expression.expr[key], context);
                    return accum;
                }, {});
            }
        },
        ant: function () {
            var value = generateArguments([expression.right], context, event)[0];
            return setModelValue(expression.left, context, value);
        }
    };
    return internalParser[expression.type] && internalParser[expression.type]();
}
function setModelValue(key, model, value) {
    if (isarray(key)) {
        model = resolveContext(key.slice(1, key.length - 1), model);
        key = key[key.length - 1];
    }
    if (model) {
        model[key] = value;
    }
    return value;
}
function resolveContext(key, context) {
    return key.reduce(function (prev, curr) {
        return prev ? prev[curr] : null;
    }, context || {});
}
function matchStringWithArray(key, model, create) {
    var modelDepth = model, i = 0;
    while (i <= key.length - 1) {
        modelDepth = createNewInstance(modelDepth, key[i], create, !isNaN(Number(key[i + 1])));
        i++;
    }
    return modelDepth;
}
function createNewInstance(model, key, create, nextIsArrayKey) {
    var objectType = nextIsArrayKey ? [] : {};
    if (create && !model[key]) {
        model[key] = objectType;
    }
    return model && model[key] || objectType;
}
function generateArrayKeyType(key, model) {
    if (-1 < key.indexOf('[')) {
        model = model || {};
        return key.split('[').map(function (current) {
            if (current.indexOf(']') > -1) {
                var _key = current.split(']')[0];
                return model.hasOwnProperty(_key) ? model[_key] : _key;
            }
            return current;
        }).join('.');
    }
    return key;
}
function Subject() {
    this._subscribers = [];
    this.next = function (value) {
        this._subscribers.forEach(function (callback) {
            callback(value);
        });
    };
}
Subject.prototype.subscribe = function (callback) {
    this._subscribers.push(callback);
};
Subject.prototype.unsubscribe = function (fn) {
    this._subscribers = this._subscribers.filter(function (callback) {
        return callback !== fn;
    });
};
Subject.prototype.destroy = function () {
    this._subscribers.length = 0;
};
function QueryList() {
    this._list = [];
    Object.defineProperties(this, {
        length: {
            get: function () {
                return this._list.length;
            }
        },
        first: {
            get: function () {
                return this._list[0];
            }
        },
        last: {
            get: function () {
                return this._list[this.length - 1];
            }
        }
    });
}
QueryList.prototype.add = function (element, emitEvent) {
    this._list.push(element);
    if (emitEvent) {
        this.onChanges.next({
            value: element,
            type: 'add'
        });
    }
};
QueryList.prototype.get = function (element) {
    if (element) {
        return this._list.find(function (ele) {
            return ele === element;
        });
    }
    return this._list;
};
QueryList.prototype.filter = function (callback) {
    this._list.filter(callback);
};
QueryList.prototype.forEach = function (callback) {
    this._list.forEach(callback);
};
QueryList.prototype.reduce = function (callback, accumulator) {
    return this._list.reduce(callback, accumulator);
};
QueryList.prototype.some = function (callback) {
    return this._list.some(callback);
};
QueryList.prototype.map = function (callback) {
    return this._list.map(callback);
};
QueryList.prototype.findByIndex = function (index) {
    return this._list[index];
};
QueryList.prototype.find = function (callback) {
    return this._list.find(callback);
};
QueryList.prototype.toString = function () {
    return JSON.stringify(this._list);
};
QueryList.prototype.destroy = function () {
    while (this._list.length) {
        this._list.pop().remove();
    }
    this.onChanges.destroy();
};
QueryList.prototype.reset = function (newItem, emitEvent) {
    this.destroy();
    for (var i = 0; i < newItem.length; i++) {
        this.add(newItem[i], emitEvent);
    }
};
QueryList.prototype.remove = function (element) {
    var index = this._list.findIndex(function (ele) {
        return ele === element;
    });
    return this.removeByIndex(index);
};
QueryList.prototype.removeByIndex = function (index) {
    var element = this._list.splice(index, 1)[0];
    this.onChanges.next({
        value: element,
        type: 'detached'
    });
    return element;
};
QueryList.prototype.onChanges = new Subject();
function TextNodeRef(definition, parent) {
    var _this = this;
    this.nativeNode = document.createTextNode(definition.ast.rawValue);
    this.type = 'text';
    this.render = function () {
        compileTemplate(definition.ast, parent.context, function (value) {
            _this.nativeNode.nodeValue = value;
        });
    };
    Object.defineProperty(this, 'hasBinding', {
        get: function () {
            return !!definition.ast.templates;
        }
    });
    if (definition.ast._) {
        parent.observer(SubscribeObservables(parent.hostRef.refId, this.render));
    }
    ;
}
TextNodeRef.prototype.remove = function () {
    this.nativeNode.remove();
    this.nativeNode = null;
};
var _MutationObserver = function () {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    var _regsisteredListeners = [], observer, observerStarted = false;
    function isInPage(node) {
        return node === document.body ? false : !document.body.contains(node);
    }
    function triggerRemovedNodes() {
        _regsisteredListeners = _regsisteredListeners.filter(function (event) {
            var removed = isInPage(event.node);
            if (removed) {
                event._callback();
            }
            return !removed;
        });
    }
    function inStack(ele) {
        return _regsisteredListeners.some(function (obj) {
            return obj.node === ele;
        });
    }
    function startObserver() {
        observer.observe(document.body, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
        });
        observerStarted = true;
    }
    if (MutationObserver) {
        observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.removedNodes.length) {
                    triggerRemovedNodes();
                }
            });
        });
        if (document.body) {
            startObserver();
        }
    }
    function ObserverFacade(ele, CB) {
        if (!ele) {
            return;
        }
        if (!observerStarted) {
            startObserver();
        }
        if (!inStack(ele)) {
            _regsisteredListeners.push({
                node: ele,
                _callback: CB || noop
            });
        }
    }
    ;
    return ObserverFacade;
}();
function EventEmitter() {
    this._listeners = [];
    this.subscribe = function (fn) {
        if (isfunction(fn)) {
            this._listeners.push(fn);
        }
    };
}
EventEmitter.prototype.emit = function (args) {
    this._listeners.forEach(function (fn) {
        fn(args);
    });
};
EventEmitter.prototype.destroy = function () {
    this._listeners.length = 0;
};
function CorePromiseHandler(triggerAfterResolve) {
    var _untilObserver = [];
    var untilStarted = false;
    var state = {
        pending: true,
        value: null,
        resolvedWith: ''
    };
    var _pending = [];
    function checkPendingState() {
        if (!state.pending) {
            _complete(state.resolvedWith, state.value);
        } else if (_untilObserver.length && !untilStarted) {
            untilStarted = true;
            startUntilObserver();
        }
    }
    function startUntilObserver() {
        var _interval = setInterval(function () {
            var allPassed = _untilObserver.map(function (fn) {
                return fn();
            }).filter(function (ans) {
                return !!ans;
            }).length;
            if (allPassed === _untilObserver.length) {
                _complete('resolve');
                _untilObserver.length = 0;
                clearInterval(_interval);
            }
        }, 100);
    }
    function _complete(type, result) {
        while (_pending[0]) {
            var fn = _pending.shift()[type];
            fn.apply(null, result);
        }
        state.pending = false;
        state.value = result;
        state.resolvedWith = type;
        (triggerAfterResolve || function () {
        })();
    }
    ;
    function _registerListener(listeners) {
        _pending.push(listeners);
        checkPendingState();
    }
    return {
        complete: _complete,
        checkPendingState: checkPendingState,
        startUntilObserver: startUntilObserver,
        until: _untilObserver,
        registerListener: _registerListener
    };
}
function Defer(triggerAfterResolve) {
    var core = CorePromiseHandler(triggerAfterResolve);
    this.resolve = function () {
        core.complete('done', arguments);
    };
    this.reject = function () {
        core.complete('fail', arguments);
    };
    this.done = function (callback) {
        core.registerListener({ done: callback });
        return this;
    };
    this.fail = function (callback) {
        core.registerListener({ fail: callback });
        return this;
    };
}
function _Promise(triggerAfterResolve) {
    var core = CorePromiseHandler(triggerAfterResolve);
    this.resolve = function () {
        core.complete('resolve', arguments);
    };
    this.reject = function (result) {
        core.complete('reject', arguments);
    };
    this.until = function (untilObserver) {
        core.until.push(untilObserver);
        return this;
    };
    this.then = function (success, failure) {
        core.registerListener({
            resolve: success || function () {
            },
            reject: failure || function () {
            }
        });
        return this;
    };
    this.catch = function (failure) {
        core.registerListener({
            reject: failure || function () {
            }
        });
    };
}
_Promise.all = function (resolve) {
    var slice = [].slice, resolveValues = arguments.length == 1 && resolve.length ? resolve : slice.call(arguments), length = resolveValues.length, remaining = length, deferred = new Defer(), failed = 0, results = [];
    function updateDefered(idx, err) {
        return function (res) {
            results[idx] = res;
            if (err) {
                ++failed;
            }
            if (!--remaining) {
                deferred[failed ? 'reject' : 'resolve'](results);
            }
        };
    }
    for (var i = 0; i < length; i++) {
        var cur = resolveValues[i];
        if (cur instanceof _Promise) {
            cur.then(updateDefered(i), updateDefered(i, 1));
        } else {
            updateDefered(i)(cur);
        }
    }
    return deferred;
};
function CustomEventHandler(type, defaultFn, eventExtension) {
    if (!type) {
        type = 'on';
    }
    ;
    if (typeof eventExtension !== 'function') {
        eventExtension = function (obj) {
            return obj;
        };
    }
    var registered = +new Date();
    var _eventsQueue = {};
    var _eventsObj = function () {
        return eventExtension({
            type: '',
            registered: registered,
            timestamp: +new Date(),
            isTrusted: true,
            returnValue: true,
            target: null,
            defaultPrevented: false,
            preventDefault: function () {
                this.defaultPrevented = true;
            }
        });
    };
    var _defaultFn = defaultFn || function () {
    };
    function CustomEvent() {
        this[type] = function (name, fn) {
            if (!_eventsQueue[name]) {
                _eventsQueue[name] = [];
            }
            _eventsQueue[name].push(fn);
            return _eventsQueue[name].length - 1;
        };
    }
    CustomEvent.prototype.dispatch = function (name) {
        var _events = _eventsObj();
        _events.type = name;
        _events.timestamp = +new Date();
        var arg = [_events].concat(Array.prototype.slice.call(arguments, 1, arguments.length));
        if (_eventsQueue[name]) {
            _eventsQueue[name].forEach(function (fn) {
                fn.apply(fn, arg);
            });
        }
        if (!_events.defaultPrevented) {
            _defaultFn.apply(_defaultFn, arg);
        }
    };
    CustomEvent.prototype.unlink = function (eventName, index) {
        if (_eventsQueue[eventName] && _eventsQueue[eventName].length) {
            _eventsQueue[eventName].splice(1, index);
        }
    };
    CustomEvent.prototype.destroy = function (name) {
        if (name && _eventsQueue[name]) {
            delete _eventsQueue[name];
        }
    };
    CustomEvent.prototype.one = function (eventName, idx) {
        if (_eventsQueue[eventName] && _eventsQueue[eventName].length) {
            return _eventsQueue[eventName][idx];
        }
    };
    return new CustomEvent();
}
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
}
;
function ComponentFactoryResolver(selector, element, callback) {
    var component, controller;
    if (!CoreBootstrapContext.compiledModule.annotations.exports.has(selector)) {
        CoreBootstrapContext.compiledModule.requiredModules.forEach(function (moduleName) {
            var _module = ModuleService._factories.get(moduleName);
            if (_module.annotations.exports.has(selector)) {
                controller = _module.annotations.exports.get(selector);
            }
        });
    } else {
        controller = CoreBootstrapContext.compiledModule.annotations.exports.get(selector);
    }
    if (controller && element) {
        component = new ElementRef(document.createElement(selector), element, {
            name: selector,
            type: 'element',
            isc: true
        });
        ElementCompiler(controller, component, function (componentInstance) {
            component.parent.children.add(component);
            callback(component, componentInstance);
        });
    } else {
        throw new Error('Unable to resolve component: ' + selector);
    }
}
function IterableProfiler() {
    this._destroyed = false;
    var cacheHash = [];
    var out = null;
    function generateHash(_source, out) {
        for (var i = 0; i < _source.length; i++) {
            cacheHash.push(getHash(_source[i]));
            out.insert.push({
                value: _source[i],
                key: i
            });
        }
    }
    function getHash(item, key) {
        if (item && typeof item === 'object') {
            item = JSON.stringify(item);
        }
        return hashcode(item);
    }
    function CoreProfiler(source) {
        if (source && !(source instanceof Array)) {
            throw new Error('Collection should be an array');
        }
        out = {
            deleted: [],
            insert: [],
            moved: [],
            changes: []
        };
        if ((!source || !source.length) && (!cacheHash || !cacheHash.length)) {
            return out;
        }
        if (!cacheHash.length && source.length) {
            generateHash(source, out);
            return out;
        }
        if (!source.length && cacheHash.length) {
            out.deleted = Object.keys(cacheHash).map(Number);
            cacheHash.length = 0;
            return out;
        }
        var len = source.length;
        for (var inc = 0; inc < len; inc++) {
            var item = source[inc], hash = getHash(item, inc);
            if (cacheHash.hasOwnProperty(inc)) {
                if (cacheHash[inc] !== hash) {
                    var index = cacheHash.indexOf(hash);
                    if (index > -1) {
                        cacheHash[index] = cacheHash[inc];
                    }
                    out.changes.push(inc);
                }
            } else {
                out.insert.push({
                    value: item,
                    key: inc
                });
            }
            cacheHash[inc] = hash;
        }
        if (cacheHash.length > source.length) {
            out.deleted.push.apply(out.deleted, Object.keys(cacheHash).splice(source.length, cacheHash.length).map(Number));
            cacheHash.splice(source.length, cacheHash.length);
        }
        return out;
    }
    this.forEachChanges = function (callback) {
        out.changes.forEach(callback);
    };
    this.forEachDeleted = function (callback) {
        out.deleted.forEach(callback);
    };
    this.forEachInserted = function (callback) {
        out.insert.forEach(callback);
    };
    this.forEachInsertedAsync = function (callback, afterMapCallback) {
        out.insert.map(callback).forEach(afterMapCallback);
    };
    this.forEachChangesAsync = function (callback, afterMapCallback) {
        out.changes.map(callback).forEach(afterMapCallback);
    };
    this.forEachDeletedAsync = function (callback, afterMapCallback) {
        out.deleted.map(callback).forEach(afterMapCallback);
    };
    this.diff = function (source) {
        if (this._destroyed) {
            return false;
        }
        CoreProfiler(source);
        return (out.changes.length || out.deleted.length || out.insert.length) > 0;
    };
    this.checkDuplicateRepeater = function (repeater) {
        if (repeater && isarray(repeater)) {
            if (noDubs(repeater).length < repeater.length) {
                errorBuilder('Duplicate values are not allowed in repeaters. Use \'track by\' expression to specify unique keys');
            }
        }
    };
    this.destroy = function () {
        this._destroyed = true;
        cacheHash.length = 0;
        out = null;
    };
}
exports.errorBuilder = errorBuilder;
exports.ProviderToken = ProviderToken;
exports.Inject = Inject;
exports.AutoWire = AutoWire;
exports.closureRef = closureRef;
exports.resolveClosureRef = resolveClosureRef;
exports.ChangeDetector = ChangeDetector;
exports.Observer = Observer;
exports.INITIALIZERS = INITIALIZERS;
exports.bootStrapApplication = bootStrapApplication;
exports.ViewParser = ViewParser;
exports.sce = sce;
exports.TemplateRef = TemplateRef;
exports.ViewRef = ViewRef;
exports.AttributeAppender = AttributeAppender;
exports.ElementStyle = ElementStyle;
exports.ElementClassList = ElementClassList;
exports.ElementRef = ElementRef;
exports.filterParser = filterParser;
exports.Subject = Subject;
exports.EventEmitter = EventEmitter;
exports._Promise = _Promise;
exports.CorePromiseHandler = CorePromiseHandler;
exports.Defer = Defer;
exports.CustomEventHandler = CustomEventHandler;
exports.ComponentFactoryResolver = ComponentFactoryResolver;
exports.IterableProfiler = IterableProfiler;
},
'node_modules/js-helpers/helpers.js': function(exports){

exports.inarray = __required('node_modules/js-helpers/fns/inarray.js').default;
exports.isarray = __required('node_modules/js-helpers/fns/isarray.js').default;
exports.isboolean = __required('node_modules/js-helpers/fns/isboolean.js').default;
exports.isdefined = __required('node_modules/js-helpers/fns/isdefined.js').default;
exports.isdouble = __required('node_modules/js-helpers/fns/isdouble.js').default;
exports.isempty = __required('node_modules/js-helpers/fns/isempty.js').default;
exports.isequal = __required('node_modules/js-helpers/fns/isequal.js').default;
exports.isfloat = __required('node_modules/js-helpers/fns/isfloat.js').default;
exports.isfunction = __required('node_modules/js-helpers/fns/isfunction.js').default;
exports.isjsonstring = __required('node_modules/js-helpers/fns/isjsonstring.js').default;
exports.isnull = __required('node_modules/js-helpers/fns/isnull.js').default;
exports.isnumber = __required('node_modules/js-helpers/fns/isnumber.js').default;
exports.isobject = __required('node_modules/js-helpers/fns/isobject.js').default;
exports.isstring = __required('node_modules/js-helpers/fns/isstring.js').default;
exports.isundefined = __required('node_modules/js-helpers/fns/isundefined.js').default;
},
'node_modules/js-helpers/fns/inarray.js': function(exports){
var isarray = __required('node_modules/js-helpers/fns/isarray.js').default;
var isstring = __required('node_modules/js-helpers/fns/isstring.js').default;

exports.default = function (needle, haystack) {
    return (isstring(haystack) || isarray(haystack)) && haystack.indexOf(needle) > -1;
};
},
'node_modules/js-helpers/fns/isstring.js': function(exports){

exports.default = function (str) {
    return typeof str === 'string' && new String(str) instanceof String;
};
},
'node_modules/js-helpers/fns/isarray.js': function(exports){

exports.default = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
};
},
'node_modules/js-helpers/fns/isboolean.js': function(exports){

exports.default = function (bool) {
    return Object.prototype.toString.call(bool) === '[object Boolean]';
};
},
'node_modules/js-helpers/fns/isdefined.js': function(exports){

exports.default = function (val) {
    return typeof val !== 'undefined';
};
},
'node_modules/js-helpers/fns/isdouble.js': function(exports){

exports.default = function (n) {
    return parseFloat(n) > 0;
};
},
'node_modules/js-helpers/fns/isempty.js': function(exports){

exports.default = function (val) {
    if (val && typeof val === 'object') {
        return Object.values(val).length < 1;
    }
    return !val || val === '';
};
},
'node_modules/js-helpers/fns/isequal.js': function(exports){

exports.default = function (a, b) {
    return a === b;
};
},
'node_modules/js-helpers/fns/isfloat.js': function(exports){

exports.default = function (n) {
    return Number(n) === n && n % 1 !== 0;
};
},
'node_modules/js-helpers/fns/isfunction.js': function(exports){

exports.default = function (fn) {
    return typeof fn === 'function';
};
},
'node_modules/js-helpers/fns/isjsonstring.js': function(exports){

exports.default = function (str) {
    return str && typeof str === 'string' && '{['.indexOf(str.charAt(0)) > -1 && '}]'.indexOf(str.charAt(str.length - 1)) > -1;
};
},
'node_modules/js-helpers/fns/isnull.js': function(exports){

exports.default = function (val) {
    return null === val;
};
},
'node_modules/js-helpers/fns/isnumber.js': function(exports){

exports.default = function (n) {
    return Number(n) === n && n % 1 === 0;
};
},
'node_modules/js-helpers/fns/isobject.js': function(exports){

exports.default = function (obj) {
    return typeof obj === 'object' && obj instanceof Object && Object.prototype.toString.call(obj) === '[object Object]';
}
;;
},
'node_modules/js-helpers/fns/isundefined.js': function(exports){

exports.default = function (val) {
    return typeof val === 'undefined';
};
},
'node_modules/js-helpers/utils.js': function(exports){

exports.base64 = __required('node_modules/js-helpers/fns/base64.js').default;
exports.cookie = __required('node_modules/js-helpers/fns/cookie.js').default;
exports.copy = __required('node_modules/js-helpers/fns/copy.js').default;
exports.copyfrom = __required('node_modules/js-helpers/fns/copyfrom.js').default;
exports.count = __required('node_modules/js-helpers/fns/count.js').default;
exports.expect = __required('node_modules/js-helpers/fns/expect.js').default;
exports.extend = __required('node_modules/js-helpers/fns/extend.js').default;
exports.hashcode = __required('node_modules/js-helpers/fns/hashcode.js').default;
exports.logger = __required('node_modules/js-helpers/fns/logger.js').default;
exports.makeuid = __required('node_modules/js-helpers/fns/makeuid.js').default;
exports.nodubs = __required('node_modules/js-helpers/fns/nodubs.js').default;
exports.serialize = __required('node_modules/js-helpers/fns/serializer.js').default;
exports.splitntrim = __required('node_modules/js-helpers/fns/splitntrim.js').default;
exports.toobject = __required('node_modules/js-helpers/fns/toobject.js').default;
exports.unserialize = __required('node_modules/js-helpers/fns/unserialize.js').default;
exports.camelcase = __required('node_modules/js-helpers/fns/camelcase.js').default;
exports.simpleBooleanParser = __required('node_modules/js-helpers/fns/simpleBooleanParser.js').default;
},
'node_modules/js-helpers/fns/base64.js': function(exports){

exports.default = function () {
    return {
        encode: function (str) {
            return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
        },
        decode: function (str) {
            return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        }
    };
};
},
'node_modules/js-helpers/fns/camelcase.js': function(exports){

exports.default = function (str) {
    return str(/^([A-Z])|[\s-_](\w)/g, function (match, p1, p2, offset) {
        if (p2) {
            return p2.toUpperCase();
        }
        return p1.toLowerCase();
    });
};
},
'node_modules/js-helpers/fns/cookie.js': function(exports){

exports.default = function (name, value) {
    if (typeof value != 'undefined') {
        setCookie.apply(null, arguments);
    } else {
        return getCookie(name);
    }
}
;
function setCookie(name, value, options) {
    options = options || {};
    if (value === null) {
        value = '';
        options.expires = -1;
    }
    var expires = '', isNumberExpires = typeof options.expires === 'number';
    if (options.expires && (isNumberExpires || options.expires.toUTCString)) {
        var date;
        if (isNumberExpires) {
            date = new Date();
            date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
        } else {
            date = options.expires;
        }
        expires = '; expires=' + date.toUTCString();
    }
    var path = options.path ? '; path=' + options.path : '';
    var domain = options.domain ? '; domain=' + options.domain : '';
    var secure = options.secure ? '; secure' : '';
    document.cookie = [
        name,
        '=',
        encodeURIComponent(value),
        expires,
        path,
        domain,
        secure
    ].join('');
}
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) == name + '=') {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};
},
'node_modules/js-helpers/fns/copy.js': function(exports){
var extend = __required('node_modules/js-helpers/fns/extend.js').default;

exports.default = function (item, deep) {
    var type = {};
    if (Object.prototype.toString.call(item) === '[object Array]') {
        type = [];
    }
    if (item && item.nodeType)
        return item.cloneNode(true);
    if (typeof item === 'object' && !deep)
        return item;
    if (item instanceof Date)
        return new Date(item.getTime());
    if (item instanceof RegExp)
        return new RegExp(item);
    if (typeof item !== 'object')
        return item;
    if (deep) {
        var ret;
        try {
            ret = JSON.parse(JSON.stringify(item));
        } catch (e) {
            ret = extend(true, item);
        }
        return ret;
    }
    return extend(type, item);
};
},
'node_modules/js-helpers/fns/extend.js': function(exports){
function extend() {
    if (Object.assign) {
        return Object.assign.apply(Object, arguments);
    }
    var extended = {};
    var deep = typeof arguments[0] === 'boolean';
    var i = 0;
    var length = arguments.length;
    if (deep) {
        i++;
        deep = arguments[0];
    }
    if (Object.prototype.toString.call(arguments[i]) === '[object Array]') {
        extended = Array(arguments[i].length);
    }
    var merger = function (source) {
        for (var name in source) {
            if (source.hasOwnProperty(name)) {
                if (deep && (source[name] && typeof source[name] === 'object') && !Object.keys(source[name]).length) {
                    extended[name] = extend(true, extended[name], source[name]);
                } else {
                    extended[name] = source[name];
                }
            }
        }
    };
    for (; i < length; i++) {
        merger(arguments[i]);
    }
    return extended;
}
exports.extend = extend;
},
'node_modules/js-helpers/fns/copyfrom.js': function(exports){
function copyFrom(to, from) {
    for (var key in to) {
        if (from.hasOwnProperty(key)) {
            if (typeof to[key] === 'object') {
                to[key] = copyFrom(to[key], from[key]);
            } else {
                to[key] = from[key];
            }
        }
    }
    return to;
}
},
'node_modules/js-helpers/fns/count.js': function(exports){

exports.default = function (obj) {
    return Object.keys(obj);
};
},
'node_modules/js-helpers/fns/expect.js': function(exports){
var isobject = __required('node_modules/js-helpers/fns/isobject.js').default;

exports.default = function (objToInspect) {
    var isObject = isobject(objToInspect);
    function contains(ins) {
        if (isObject) {
            return objToInspect.hasOwnProperty(ins) || ins in objToInspect;
        } else {
            return objToInspect.indexOf(ins) > -1;
        }
    }
    function search(str, iteratorFn) {
        if (!objToInspect) {
            return false;
        }
        var found = false, len = 0, trigger = function (prop) {
                if (iteratorFn && typeof iteratorFn === 'function') {
                    if (iteratorFn(objToInspect[prop], prop, len)) {
                        found = objToInspect[prop];
                    }
                } else {
                    if (JSON.stringify(objToInspect[prop]) === JSON.stringify(str)) {
                        found = objToInspect[len];
                    }
                }
                len++;
            };
        if (isObject) {
            var ObjKeys = Object.keys(objToInspect);
            while (ObjKeys.length > len) {
                trigger(ObjKeys[len]);
            }
            ObjKeys = null;
        } else {
            while (objToInspect.length > len) {
                trigger(len);
            }
            ;
        }
        return found;
    }
    function each(iterator) {
        this.search(null, iterator);
    }
    return {
        search: search,
        contains: contains,
        each: each
    };
};
},
'node_modules/js-helpers/fns/hashcode.js': function(exports){

exports.default = function (code) {
    var hash = 0, i, chr, len;
    if (!code || code.length === 0)
        return hash;
    for (i = 0, len = code.length; i < len; i++) {
        chr = code.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
    }
    return hash;
};
},
'node_modules/js-helpers/fns/logger.js': function(exports){
var logLevels = {
    DEBUG: 4,
    LOG: 3,
    INFO: 2,
    WARN: 1,
    ERROR: 0
};
var logger = {
    _log: function logger(mockOptions, args, level) {
        var loggerLevel = 2;
        var logLevelMethods = [
            'error',
            'warn',
            'info',
            'log',
            'debug'
        ];
        if (mockOptions && typeof mockOptions.logging !== 'undefined') {
            loggerLevel = mockOptions.logging;
        }
        level = level === 0 ? level : level || logLevels.LOG;
        args = args.splice ? args : [args];
        if (loggerLevel === false || loggerLevel < level) {
            return;
        }
        if (mockOptions.log) {
            return mockOptions.log(args[1] || args[0]);
        } else if (mockOptions.logger && mockOptions.logger[logLevelMethods[level]]) {
            return mockOptions.logger[logLevelMethods[level]].apply(mockOptions.logger, args);
        }
    },
    debug: function (m, a) {
        return this._log(m, a, logLevels.DEBUG);
    },
    log: function (m, a) {
        return this._log(m, a, logLevels.LOG);
    },
    info: function (m, a) {
        return this._log(m, a, logLevels.INFO);
    },
    warn: function (m, a) {
        return this._log(m, a, logLevels.WARN);
    },
    error: function (m, a) {
        return this._log(m, a, logLevels.ERROR);
    }
};
},
'node_modules/js-helpers/fns/makeuid.js': function(exports){

exports.default = function (e) {
    var uid = '';
    var f = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var g = 0; g < e; g++) {
        uid += f.charAt(Math.floor(Math.random() * f.length));
    }
    return uid;
};
},
'node_modules/js-helpers/fns/nodubs.js': function(exports){

exports.default = function (arr) {
    return arr.reduce(function (all, item, index) {
        if (arr.indexOf(arr[index]) === index) {
            all.push(item);
        }
        return all;
    }, []);
};
},
'node_modules/js-helpers/fns/serializer.js': function(exports){
var isFunction = __required('node_modules/js-helpers/fns/isfunction.js').default;
var isObject = __required('node_modules/js-helpers/fns/isobject.js').default;
var isArray = __required('node_modules/js-helpers/fns/isarray.js').default;
function serialize(obj) {
    if (!obj)
        return;
    var param = [];
    function buildParams(prefix, dn) {
        if (isArray(dn)) {
            dn.forEach(function (n) {
                if (/\[\]$/.test(prefix)) {
                    add(prefix, n);
                } else {
                    buildParams(prefix + '[' + (isObject(n) ? prefix : '') + ']', n);
                }
            });
        } else if (isObject(dn)) {
            for (var name in dn) {
                buildParams(prefix + '[' + name + ']', dn[name]);
            }
        } else {
            add(prefix, dn);
        }
    }
    function add(key, value) {
        value = isFunction(value) ? value() : value === '' ? '' : value;
        param[param.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
    }
    ;
    return Object.keys(obj).map(function (key) {
        return buildParams(key, obj[key]);
    }).join('&').replace(/%20/g, '+');
}
exports.serialize = serialize;
},
'node_modules/js-helpers/fns/splitntrim.js': function(exports){

exports.default = function (str, regexp) {
    return (str || '').split(regexp).map(function (val) {
        return val.trim();
    });
};
},
'node_modules/js-helpers/fns/toobject.js': function(exports){

exports.default = function (str, replacerObj) {
    var newObj;
    var splitedStr = str.match(new RegExp('\\' + str.charAt(0) + '(.*?)' + '\\' + str.charAt(str.length - 1)));
    var newObj = '{' === str.charAt(0) ? {} : [];
    splitedStr = (splitedStr && splitedStr[1] || '').split(',');
    replacerObj = replacerObj || {};
    for (var j in splitedStr) {
        var xSplitedStr = splitedStr[j].split(':');
        newObj[xSplitedStr.shift()] = replacerObj[xSplitedStr.join(':')] || xSplitedStr.pop();
    }
    return newObj;
};
},
'node_modules/js-helpers/fns/unserialize.js': function(exports){

exports.default = function (par) {
    return (par || '').split('&').reduce(function (accum, val) {
        if (val) {
            var splitPairs = val.split('=');
            accum[splitPairs[0]] = JSON.parse(splitPairs[1]);
        }
        return accum;
    }, {});
};
},
'node_modules/js-helpers/fns/simpleBooleanParser.js': function(exports){

exports.default = function ($boolValue) {
    return {
        'true': true,
        '1': true,
        'on': true,
        'yes': true,
        'false': false,
        '0': false,
        'off': false,
        'no': false,
        'null': null,
        'undefined': undefined
    }[$boolValue];
};
},
'dist/form/bundles/jeli-form-module.js': function(exports){
var helpers = __required('node_modules/js-helpers/helpers.js');
var inarray = helpers['inarray'];
var isnull = helpers['isnull'];
var isfunction = helpers['isfunction'];
var isstring = helpers['isstring'];
var isnumber = helpers['isnumber'];
var isequal = helpers['isequal'];
var isundefined = helpers['isundefined'];
var isobject = helpers['isobject'];
var isempty = helpers['isempty'];
var core = __required('dist/core/bundles/jeli-core-module.js');
var ProviderToken = core['ProviderToken'];
var EventEmitter = core['EventEmitter'];
var errorBuilder = core['errorBuilder'];
var FormControlDirective = function () {
    'use strict';
    function FormControlDirective() {
        this.$context = null;
        Object.defineProperty(this, 'formControl', {
            set: function (formControl) {
                this.$context = formControl;
                if (!formControl) {
                    errorBuilder('FormController instance is required to use this directive');
                }
            }
        });
    }
    FormControlDirective.prototype.onSubmitHandler = function (event) {
        event.preventDefault();
    };
    FormControlDirective.prototype.viewDidDestroy = function () {
        if (this.$context) {
            this.$context.destroy();
            this.$context = null;
        }
    };
    FormControlDirective.annotations = {
        selector: 'formControl',
        props: { formControl: {} },
        events: {
            submit: {
                type: 'event',
                value: [{
                        type: 'call',
                        args: ['$event'],
                        fn: 'onSubmitHandler'
                    }]
            }
        },
        exportAs: 'formControl',
        module: 'FormModule'
    };
    return FormControlDirective;
}();
var VALID = 'VALID';
var INVALID = 'INVALID';
var DISABLED = 'DISABLED';
var PENDING = 'PENDING';
function FormControlAbstract(validators) {
    var _this = this;
    this._parent = null;
    this.status = INVALID;
    this.value = null;
    this.error = null;
    this.touched = false;
    this._pendingValue = null;
    this._eventType = 'default';
    this._onDisableEvents = [];
    this._onControlChangeListener = function () {
    };
    this.validator = FormValidatorService(function (validatorInstance) {
        _this.error = validatorInstance.failedValidation[_this.name];
        if (!validatorInstance.validationFailed) {
            _this.valueChanges.emit(_this.value);
        }
    }, validators);
    this.valueChanges = new EventEmitter();
    this.statusChanged = new EventEmitter();
    Object.defineProperty(this, 'parent', {
        get: function () {
            return this._parent;
        }
    });
    Object.defineProperties(this, {
        untouched: {
            get: function () {
                return !this.touched;
            }
        },
        'invalid': {
            get: function () {
                return isequal(this.status, INVALID);
            }
        },
        'enabled': {
            get: function () {
                return !isequal(this.status, DISABLED);
            }
        },
        'disabled': {
            get: function () {
                return isequal(this.status, DISABLED);
            }
        },
        'valid': {
            get: function () {
                return isequal(this.status, VALID);
            }
        }
    });
}
FormControlAbstract.prototype.setParent = function (context) {
    this._parent = context;
};
FormControlAbstract.prototype._anyFieldHasStatus = function (status) {
    return this._anyControl(function (control) {
        return isequal(control.status, status);
    });
};
FormControlAbstract.prototype._anyControl = function () {
};
FormControlAbstract.prototype.setStatus = function () {
    if (this.disabled)
        return DISABLED;
    if (this.error)
        return INVALID;
    if (this._anyFieldHasStatus(INVALID))
        return INVALID;
    return VALID;
};
FormControlAbstract.prototype.destroy = function () {
    if (this.formFieldControls) {
        this.formFieldControls = null;
    }
    this._parent = null;
    this.valueChanges.destroy();
    this.valueChanges.destroy();
};
FormControlAbstract.prototype.markAsTouched = function (options) {
    options = options || {};
    this.touched = true;
    if (this._parent && !option.self) {
        this._parent.markAsTouched(options);
    }
};
FormControlAbstract.prototype.markAllAsTouched = function () {
    this.markAsTouched({ self: true });
    this.forEachField(function (control) {
        control.markAllAsTouched();
    });
};
FormControlAbstract.prototype.updateValueAndStatus = function (options) {
    options = options || {};
    this._setInitialStatus();
    this._updateValue();
    if (this.enabled) {
        this.error = null;
        this.status = this.setStatus();
        this._runValidators();
    }
    if (!isequal(options.emitEvent, false)) {
        this.valueChanges.emit(this.value);
    }
    if (this._parent && !isequal(options.self, false)) {
        this._parent.updateValueAndStatus(options);
    }
};
FormControlAbstract.prototype.enable = function (options) {
    options = options || {};
    this.status = VALID;
    this.updateValueAndStatus({
        self: true,
        emitEvent: options.emitEvent
    });
    this.forEachField(function (control) {
        control.enable({ self: true });
    });
    this._onDisableEvents.forEach(function (listener) {
        listener(false);
    });
};
FormControlAbstract.prototype.disable = function (options) {
    options = options || {};
    this.status = DISABLED;
    this.forEachField(function (control) {
        control.disable({ self: true });
    });
    this._updateValue();
    if (isequal(options.emitEvent, true)) {
        this.valueChanges.emit(this.value);
    }
    this._onDisableEvents.forEach(function (listener) {
        listener(true);
    });
};
FormControlAbstract.prototype.forEachField = function () {
};
FormControlAbstract.prototype._allFieldDisabled = function () {
    return this.disabled;
};
FormControlAbstract.prototype._setInitialStatus = function () {
    this.status = this._allFieldDisabled() ? DISABLED : VALID;
};
FormControlAbstract.prototype._updateValue = function () {
};
FormControlAbstract.prototype.setValidators = function (validator) {
    this.validator.addValidators(validator);
    this.validator();
};
FormControlAbstract.prototype._runValidators = function () {
    this.validator(this.value, this.name);
};
FormControlAbstract.prototype.markAsUntouched = function (options) {
    options = options || {};
    this.touched = false;
    this.forEachField(function (control) {
        control.markAsUntouched({ self: true });
    });
};
FormControlAbstract.prototype.markAsTouched = function (options) {
    options = options || {};
    this.touched = true;
    if (this.parent && !options.self) {
        this.parent.markAsTouched(options);
    }
};
FormControlAbstract.prototype.markAllAsUnTouched = function () {
    this.markAsUntouched({ self: true });
    this.forEachField(function (control) {
        control.markAllAsUnTouched();
    });
};
FormControlAbstract.prototype._registerOnControlChangeListener = function (fn) {
    this._onControlChangeListener = fn;
};
var FormControlService = function () {
    'use strict';
    function FormControlService(formFields, validators) {
        FormControlAbstract.call(this, validators);
        this.formFieldControls = {};
        if (!isempty(formFields)) {
            for (var field in formFields) {
                this.addField(field, formFields[field]);
            }
        }
        this.updateValueAndStatus();
    }
    FormControlService.prototype = Object.create(FormControlAbstract.prototype);
    FormControlService.prototype.constructor = FormControlAbstract;
    FormControlService.prototype.addField = function (name, fieldControl) {
        if (fieldControl instanceof FormControlService) {
            this.formFieldControls[name] = fieldControl;
        } else {
            this.formFieldControls[name] = new FormFieldControlService(name, fieldControl);
        }
        this._setupControl(this.formFieldControls[name]);
    };
    FormControlService.prototype.hasField = function (controlName) {
        return this.formFieldControls.hasOwnProperty(controlName);
    };
    FormControlService.prototype.getField = function (controlName) {
        return this.formFieldControls[controlName] || null;
    };
    FormControlService.prototype._setupControl = function (control) {
        control.setParent(this);
        control._registerOnControlChangeListener(this._onControlChangeListener);
    };
    FormControlService.prototype.patchValue = function (values, options) {
        options = options || {};
        if (isobject(values)) {
            for (var field in values) {
                if (this.hasField(field) && !options.self) {
                    this.getField(field).patchValue(values[field], {
                        self: true,
                        updateView: true
                    });
                }
            }
        }
    };
    FormControlService.prototype.setValue = function (values, options) {
        this._allValuePresent(values);
        for (var field in values) {
            this._isControlPresent(field);
            this.formFieldControls[field].setValue(values[key], { self: options && options.self });
        }
    };
    FormControlService.prototype.forEachField = function (callback) {
        var _this = this;
        Object.keys(this.formFieldControls).forEach(function (field) {
            callback(_this.formFieldControls[field], field);
        });
    };
    FormControlService.prototype.reset = function (value, options) {
        options = options || {};
        this.forEachField(function (control, name) {
            control.reset(value[name], {
                self: true,
                emitEvent: options.emitEvent
            });
        });
    };
    FormControlService.prototype.setFormFieldValidators = function (fieldValidators) {
        for (var field in fieldValidators) {
            this.setFieldValidator(field, fieldValidators[field]);
        }
    };
    FormControlService.prototype.setFieldValidator = function (field, validator) {
        this.getField(field).setValidators(validator);
        return this;
    };
    FormControlService.prototype.removeField = function (name) {
        this.getField(name).destroy();
        delete this.values[name];
        this.valueChanges.next(this.values);
    };
    FormControlService.prototype._allValuePresent = function (values) {
        this.forEachField(function (control, field) {
            if (!isundefined(values[field])) {
                errorBuilder('value for formField(' + field + ') is missing');
            }
        });
    };
    FormControlService.prototype._isControlPresent = function (field) {
        if (!Object.keys(this.formFieldControls).length) {
            errorBuilder('There are no field controls registered to this form');
        }
        if (!this.hasField(field)) {
            errorBuilder('Cannot find field control for ' + field);
        }
    };
    FormControlService.prototype._anyControl = function (callback) {
        for (var field in this.formFieldControls) {
            var found = callback(this.formFieldControls[field]);
            if (found) {
                return found;
            }
        }
        return undefined;
    };
    FormControlService.prototype._allFieldDisabled = function () {
        for (var field in this.formFieldControls) {
            if (this.formFieldControls[field].enabled) {
                return false;
            }
        }
        return Object.keys(this.formFieldControls).length > 0 || this.disabled;
    };
    FormControlService.prototype._updateValue = function () {
        this.value = this._collectValues();
    };
    FormControlService.prototype._collectValues = function () {
        var values = {};
        this.forEachField(function (control, field) {
            if (control.enabled) {
                values[field] = control.value;
            }
        });
        return values;
    };
    FormControlService.prototype._getFieldErrors = function () {
        var errors = {};
        var invalid = false;
        this.forEachField(function (control, field) {
            if (control.error) {
                errors[field] = control.error;
                invalid = true;
            }
        });
        return invalid ? errors : null;
    };
    FormControlService.annotations = {
        name: 'formControlService',
        static: true
    };
    FormControlService.annotations.instance = FormControlService;
    return FormControlService;
}();
var FormFieldControlDirective = function () {
    'use strict';
    function FormFieldControlDirective(elementRef, formControl) {
        this.control = null;
        this.didInit = function () {
            this.control.attachView({
                element: elementRef,
                canSetValue: isequal('input', EventHandler.getEventType(elementRef.nativeElement)),
                viewRef: -1
            });
        };
        Object.defineProperty(this, 'control', {
            get: function (control) {
                if (!(control instanceof FormFieldControlService)) {
                    errorBuilder(new TypeError('Invalid field control'));
                }
                if (formControl && formControl instanceof FormControlDirective) {
                    errorBuilder('use a {:form-field} directive instead.');
                }
                this.control = control;
            }
        });
    }
    FormFieldControlDirective.annotations = {
        selector: 'fieldControl',
        DI: {
            ElementRef: { optional: true },
            formControl: {
                optional: true,
                value: 'formControl',
                isdir: true
            }
        },
        props: { control: { value: 'fieldControl' } },
        events: {
            default: {
                type: 'event',
                value: [{
                        type: 'call',
                        args: ['$event'],
                        fn: 'eventListener'
                    }]
            }
        },
        dynamicInjectors: true,
        module: 'FormModule'
    };
    return FormFieldControlDirective;
}();
var FormFieldControlService = function () {
    'use strict';
    function FormFieldControlService(checker, fieldControl) {
        FormControlAbstract.call(this, fieldControl ? fieldControl.validators : null);
        this._onChangeEvents = [];
        this.name = checker;
        this._setInitialState(fieldControl);
        this.updateValueAndStatus({
            self: true,
            emitEvent: false
        });
    }
    FormFieldControlService.prototype = Object.create(FormControlAbstract.prototype);
    FormFieldControlService.prototype.constructor = FormControlAbstract;
    FormFieldControlService.prototype._setInitialState = function (state) {
        if (isobject(state)) {
            this.value = state.value;
            state.disabled ? this.disable({ self: true }) : this.enable({ self: true });
        } else {
            this.value = state;
        }
    };
    FormFieldControlService.prototype.setValue = function (value, options) {
        options = options || {};
        this.value = value;
        if (this._onChangeEvents.length && !isequal(options.emitToView, false)) {
            this._onChangeEvents.length && this._onChangeEvents.forEach(function (eventChange) {
                return eventChange(value, !isequal(options.emitToView, false));
            });
        }
        this.updateValueAndStatus(options);
    };
    FormFieldControlService.prototype.patchValue = function (val, options) {
        if (!options) {
            options = {};
        }
        this.setValue(val, options);
    };
    FormFieldControlService.prototype.reset = function (config, options) {
        this._setInitialState(config);
        this.markAsUntouched(options);
        this.setValue(this.value, options);
    };
    FormFieldControlService.prototype.registerOnChangeListener = function (listener) {
        this._onChangeEvents.push(listener);
    };
    FormFieldControlService.prototype.registerOnDisabledListener = function (listener) {
        this._onDisableEvents.push(listener);
    };
    FormFieldControlService.prototype.clearListeners = function () {
        this._onChangeEvents.length = 0;
        this._onDisableEvents.length = 0;
    };
    FormFieldControlService.annotations = {
        name: 'formFieldService',
        static: true
    };
    FormFieldControlService.annotations.instance = FormFieldControlService;
    return FormFieldControlService;
}();
var FormFieldDirective = function () {
    'use strict';
    function FormFieldDirective(elementRef, parentControl) {
        Object.defineProperties(this, {
            formField: {
                set: function (formFieldName) {
                    this._fieldName = formFieldName;
                    if (parentControl) {
                        this._control = parentControl.getField(formFieldName);
                    }
                    this._setUpControl();
                }
            }
        });
    }
    FormFieldDirective.prototype._setUpControl = function () {
        this._attachView();
        this._control.registerOnChangeListener(function (value, emitToView) {
            console.log('value changed:', value, emitToView);
        });
    };
    FormFieldDirective.prototype.viewDidDestroy = function () {
        if (this._parentControl) {
            this._parentControl.removeField(this._fieldName);
            this._parentControl = null;
        }
        this._control = null;
        this._viewInstance = null;
    };
    FormFieldDirective.annotations = {
        selector: 'formField',
        DI: {
            ElementRef: { optional: true },
            parentControl: {
                optional: true,
                value: 'formControl',
                isdir: true
            }
        },
        props: { formField: {} },
        dynamicInjectors: true,
        module: 'FormModule'
    };
    return FormFieldDirective;
}();
function CurrentInstance(successHandler, errorHandler) {
    this.pending = {
        count: 0,
        fields: {}
    };
    this.hasAjax = false;
    this.add = function (field, len) {
        this.pending.fields[field] = {
            count: len,
            failed: []
        };
        this.pending.count++;
    };
    this.rem = function (passed, field, type) {
        this.pending.fields[field].count--;
        if (!passed) {
            this.pending.fields[field].failed.push(type);
        }
        if (!this.pending.fields[field].count) {
            if (this.pending.fields[field].failed.length) {
                errorHandler(field, this.pending.fields[field].failed);
            }
            this.pending.count--;
        }
        if (!this.pending.count && successHandler) {
            successHandler();
        }
    };
}
CurrentInstance.prototype.clean = function () {
    this.pending = {
        count: 0,
        fields: {}
    };
    this.hasAjax = false;
    this.resolve = null;
};
CurrentInstance.prototype.registerAjax = function (AjaxInstance, Request, field, name) {
    this.hasAjax = true;
    var _this = this;
    AjaxInstance.then(function (res) {
        _this.rem((Request.onsuccess || function () {
            return true;
        })(res), field, name);
    }, function (res) {
        _this.rem((Request.onerror || function () {
            return false;
        })(res), field, name);
    });
};
var formValidationStack = Object.create({
    minlength: function (value, requiredLength) {
        if (!isnumber(value) && !isstring(value)) {
            return false;
        }
        return String(value).length >= requiredLength;
    },
    maxlength: function (value, requiredLength) {
        if (!isnumber(value) && !isstring(value)) {
            return false;
        }
        return String(value).length <= requiredLength;
    },
    emailvalidation: function (val) {
        var regExp = /^\w+([\.-]?\w+)*@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regExp.test(val);
    },
    isempty: function (val, def) {
        return def === isempty(val);
    },
    boolean: function (bool, val) {
        return bool === val;
    },
    domainvalidation: function (domain) {
        return /[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/.test(domain);
    },
    mediumpasswordstrength: function (passwd) {
        return new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})').test(passwd);
    },
    strongpasswordstrength: function (passwd) {
        return new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})').test(passwd);
    },
    pattern: function (value, pattern) {
        return new RegExp(pattern).test(value);
    },
    $ajax: function (val, def) {
        if (!isobject(def) || !isfunction(def.resolve)) {
            return false;
        }
        return def.resolve(val);
    },
    required: function (value, required) {
        if (required) {
            return !isundefined(value) && !isnull(value) && !isempty(value);
        }
        return !required;
    }
});
var FormValidatorService = function () {
    'use strict';
    function FormValidatorService(callback, validators) {
        var currentProcess = new CurrentInstance(trigger, ErrorHandler);
        var validationInstance = null;
        function ErrorHandler(key, validations) {
            validationInstance.failedValidation[key] = validations;
            validationInstance.validationFailed = true;
        }
        function trigger() {
            callback(validationInstance);
        }
        function setValidationInstance() {
            validationInstance = {
                requiresValidation: false,
                emptyFormFields: false,
                failedValidation: {},
                validationFailed: false
            };
        }
        function _throwErrorIfNoValidators(validatorsObj) {
            if (!isobject(validatorsObj)) {
                throw new Error('Validators are required in other to perform validations');
            }
        }
        function _validateField(value, criteria, field) {
            var _criteria = Object.keys(criteria);
            currentProcess.add(field, _criteria.length);
            for (var i = 0; i < _criteria.length; i++) {
                var validatorName = _criteria[i];
                var passed = false, validatorFn = formValidationStack[validatorName];
                if (validatorFn) {
                    passed = validatorFn(value, criteria[validatorName]);
                } else if (isfunction(criteria[validatorName])) {
                    passed = criteria[validatorName](value);
                }
                if (isobject(passed) && isequal('$ajax', validatorName)) {
                    return currentProcess.registerAjax(passed, criteria[validatorName], field, validatorName);
                }
                currentProcess.rem(passed, field, validatorName);
            }
        }
        function _validateObjectTypes(formValues) {
            if (!Object.keys(formValues).length) {
                validationInstance.emptyFormFields = true;
                trigger();
            } else {
                var _fieldsToValidate = Object.keys(validators);
                var err = _fieldsToValidate.reduce(function (ret, key) {
                    if (!formValues.hasOwnProperty(key)) {
                        ret++;
                        ErrorHandler(key, ['required']);
                    }
                    return ret;
                }, 0);
                if (!err) {
                    currentProcess.pending.count = _fieldsToValidate.length;
                    _fieldsToValidate.forEach(function (field) {
                        _validateField(formValues[field], validators[field], field);
                    });
                } else {
                    trigger();
                }
            }
        }
        function formValidator(formValue, field) {
            if (!validators) {
                return trigger();
            }
            _throwErrorIfNoValidators(validators);
            currentProcess.clean();
            setValidationInstance();
            if (isobject(formValue)) {
                _validateObjectTypes(formValue);
            } else {
                _validateField(formValue, validators, field);
            }
        }
        formValidator.addValidators = function (newValidators) {
            _throwErrorIfNoValidators(newValidators);
            if (!validators) {
                validators = newValidators;
            } else {
                validators = extend(true, validators, newValidators);
            }
        };
        setValidationInstance();
        return formValidator;
    }
    FormValidatorService.annotations = {
        name: 'formValidator',
        static: true
    };
    FormValidatorService.annotations.instance = FormValidatorService;
    return FormValidatorService;
}();
var VALUE_ACCESSOR = new ProviderToken('ValueAccessor', true);
function AbstractValueAccessor() {
    this.onChange = function () {
    };
    this.onDisable = function () {
    };
    this.onBlur = function () {
    };
}
var DefaultEventBinder = function () {
    'use strict';
    function DefaultEventBinder(elementRef) {
        this.onChange = function () {
        };
        this.onDisable = function () {
        };
        this.onBlur = function () {
        };
        this.element = elementRef;
    }
    DefaultEventBinder.prototype._handleInput = function (event) {
        this.onChange(event);
    };
    DefaultEventBinder.prototype.registerOnChange = function (onChangeFn) {
        this.onChange = onChangeFn;
    };
    DefaultEventBinder.prototype.registerOnDisable = function (onDisableFn) {
        this.onDisable = onDisableFn;
    };
    DefaultEventBinder.prototype._registerOnBlur = function (onBlurFn) {
        this.onBlur = onBlurFn;
    };
    DefaultEventBinder.prototype.writeValue = function (value) {
        this.element.setProp('value', value, true);
    };
    DefaultEventBinder.prototype.setDisableState = function (state) {
        this.element.setProp('disabled', state);
    };
    DefaultEventBinder.annotations = {
        selector: 'input:type!=checkbox|radio:model,input:type!=checkbox|radio:formField,textarea:model,textarea:formField',
        events: {
            input: {
                type: 'event',
                value: [{
                        type: 'call',
                        args: [[
                                '$event',
                                'target',
                                'value'
                            ]],
                        fn: '_handleInput'
                    }]
            },
            blur: {
                type: 'event',
                value: [{
                        type: 'call',
                        args: ['$event'],
                        fn: 'onBlur'
                    }]
            }
        },
        registerAs: VALUE_ACCESSOR,
        DI: { ElementRef: { optional: true } },
        module: 'FormModule'
    };
    return DefaultEventBinder;
}();
var CheckboxEventBinder = function () {
    'use strict';
    function CheckboxEventBinder(elementRef) {
        this.onChange = function () {
        };
        this.onDisable = function () {
        };
        this.onBlur = function () {
        };
        this.element = elementRef;
    }
    ;
    CheckboxEventBinder.prototype.registerOnChange = function (onChangeFn) {
        this.onChange = onChangeFn;
    };
    CheckboxEventBinder.prototype.registerOnDisable = function (onDisableFn) {
        this.onDisable = onDisableFn;
    };
    CheckboxEventBinder.prototype._registerOnBlur = function (onBlurFn) {
        this.onBlur = onBlurFn;
    };
    CheckboxEventBinder.prototype.writeValue = function (checked) {
        this.element.setProp('checked', checked, true);
    };
    CheckboxEventBinder.prototype.setDisableState = function (state) {
        this.element.setProp('disabled', state);
    };
    CheckboxEventBinder.annotations = {
        selector: 'input:type=checkbox:model,input:type=checkbox:formField',
        events: {
            change: {
                type: 'event',
                value: [{
                        type: 'call',
                        args: [[
                                '$event',
                                'target',
                                'checked'
                            ]],
                        fn: 'onChange'
                    }]
            },
            blur: {
                type: 'event',
                value: [{
                        type: 'call',
                        args: ['$event'],
                        fn: 'onBlur'
                    }]
            }
        },
        registerAs: VALUE_ACCESSOR,
        DI: { ElementRef: { optional: true } },
        module: 'FormModule'
    };
    return CheckboxEventBinder;
}();
var RadioEventBinder = function () {
    'use strict';
    function RadioEventBinder(elementRef) {
        this.onChange = function () {
        };
        this.onDisable = function () {
        };
        this.onBlur = function () {
        };
        this.element = elementRef;
    }
    ;
    RadioEventBinder.prototype._handleInput = function (event) {
        this.onChange(event.target.value);
    };
    RadioEventBinder.prototype.registerOnChange = function (onChangeFn) {
        this.onChange = onChangeFn;
    };
    RadioEventBinder.prototype.registerOnDisable = function (onDisableFn) {
        this.onDisable = onDisableFn;
    };
    RadioEventBinder.prototype._registerOnBlur = function (onBlurFn) {
        this.onBlur = onBlurFn;
    };
    RadioEventBinder.prototype.writeValue = function (checked) {
        this.element.setProp('checked', checked, true);
    };
    RadioEventBinder.prototype.setDisableState = function (state) {
        this.element.setProp('disabled', state);
    };
    RadioEventBinder.annotations = {
        selector: 'input:type=radio:model,input:type=radio:formField',
        props: { name: {} },
        events: {
            change: {
                type: 'event',
                value: [{
                        type: 'call',
                        args: ['$event'],
                        fn: '_handleInput'
                    }]
            },
            blur: {
                type: 'event',
                value: [{
                        type: 'call',
                        args: ['$event'],
                        fn: 'onBlur'
                    }]
            }
        },
        registerAs: VALUE_ACCESSOR,
        DI: { ElementRef: { optional: true } },
        module: 'FormModule'
    };
    return RadioEventBinder;
}();
var SelectEventBinder = function () {
    'use strict';
    function SelectEventBinder(elementRef) {
        this.onChange = function () {
        };
        this.onDisable = function () {
        };
        this.onBlur = function () {
        };
        this.element = elementRef;
    }
    ;
    SelectEventBinder.prototype._handleInput = function (event) {
        this.onChange(event);
    };
    SelectEventBinder.prototype.registerOnChange = function (onChangeFn) {
        this.onChange = onChangeFn;
    };
    SelectEventBinder.prototype.registerOnDisable = function (onDisableFn) {
        this.onDisable = onDisableFn;
    };
    SelectEventBinder.prototype._registerOnBlur = function (onBlurFn) {
        this.onBlurFn = onBlurFn;
    };
    SelectEventBinder.prototype.writeValue = function (value) {
        this.element.children.forEach(function setOptionsValue(options) {
            var optionValue = options.getAttribute('value');
            if (isequal(optionValue, value)) {
                options.setProp('selected', true);
            }
        });
    };
    SelectEventBinder.prototype.setDisableState = function (state) {
        this.element.setProp('disabled', state);
    };
    SelectEventBinder.annotations = {
        selector: 'select:model,select:formField',
        events: {
            input: {
                type: 'event',
                value: [{
                        type: 'call',
                        args: [[
                                '$event',
                                'target',
                                'value'
                            ]],
                        fn: '_handleInput'
                    }]
            },
            blur: {
                type: 'event',
                value: [{
                        type: 'call',
                        args: ['$event'],
                        fn: 'onBlur'
                    }]
            }
        },
        registerAs: VALUE_ACCESSOR,
        DI: { ElementRef: { optional: true } },
        module: 'FormModule'
    };
    return SelectEventBinder;
}();
function setUpControl(fieldControl, dir) {
    if (!fieldControl)
        errorBuilder('No field control found for ' + dir._fieldName);
    if (!dir.eventBinder)
        errorBuilder('No EventBinder defined');
    fieldControl.setValidators(dir._validators);
    dir.eventBinder.writeValue(fieldControl.value);
    setUpViewChangeEvent(fieldControl, dir);
    setupBlurEvent(fieldControl, dir);
    if (dir.eventBinder.setUpDisableState) {
        fieldControl.registerOnDisabledListener(function (state) {
            dir.eventBinder.setUpDisableState(state);
        });
    }
}
function setUpViewChangeEvent(fieldControl, dir) {
    dir.eventBinder.registerOnChange(function (value) {
        fieldControl._pendingValue = value;
        fieldControl._pendingChange = true;
        if (!isequal(fieldControl.eventType, 'blur')) {
            updateControl(fieldControl, dir);
        }
    });
    fieldControl.registerOnChangeListener(function (value, emitEvent) {
        dir.eventBinder.writeValue(value);
        if (emitEvent) {
            dir.modelToViewUpdate(value);
        }
    });
}
function setupBlurEvent(fieldControl, dir) {
    if (dir.eventBinder.registerOnBlur) {
        dir.eventBinder.registerOnBlur(function () {
            if (isequal(fieldControl.eventType, 'blur') && fieldControl._pendingChange) {
                updateControl(fieldControl, dir);
            }
        });
    }
}
function updateControl(fieldControl, dir) {
    fieldControl.setValue(fieldControl._pendingValue, { emitToView: false });
    dir.modelToViewUpdate(fieldControl._pendingValue);
    fieldControl._pendingChange = false;
}
var inbuiltAccessor = [
    CheckboxEventBinder,
    DefaultEventBinder,
    RadioEventBinder,
    SelectEventBinder
];
function getValueAccessor(valueAccessors) {
    var inbuilt = null, custom = null;
    valueAccessors.forEach(function (accessorInstance) {
        if (inbuiltAccessor.includes(accessorInstance.constructor)) {
            if (inbuilt) {
                errorBuilder('found multiple inbuilt valueAccessor instance.');
            }
            inbuilt = accessorInstance;
        } else {
            if (custom) {
                errorBuilder('found multiple custom valueAccessor instance.');
            }
            custom = accessorInstance;
        }
    });
    if (custom) {
        return custom;
    }
    return inbuilt;
}
var ModelDirective = function () {
    'use strict';
    function ModelDirective(eventBinder, parentControl, validators) {
        this.eventBinder = getValueAccessor(eventBinder);
        this.fieldControl = new FormFieldControlService();
        this._parentControl = parentControl;
        this._validators = validators;
        this.modelChange = new EventEmitter();
        console.log(this);
    }
    ModelDirective.prototype.modelToViewUpdate = function (value) {
        this.model = value;
        this.modelChange.emit(value);
    };
    ModelDirective.prototype.didInit = function () {
        setUpControl(this.fieldControl, this);
    };
    ModelDirective.prototype.viewDidDestroy = function () {
        this.unSubscription();
        this._control = null;
    };
    ModelDirective.annotations = {
        selector: 'model',
        DI: {
            VALUE_ACCESSOR: { factory: VALUE_ACCESSOR },
            parentControl: {
                optional: true,
                value: 'form'
            },
            VALIDATORS: { optional: true }
        },
        props: {
            model: {},
            modelOptions: {},
            name: {}
        },
        events: { modelChange: { type: 'emitter' } },
        exportAs: 'jModel',
        dynamicInjectors: true,
        module: 'FormModule'
    };
    return ModelDirective;
}();
var FormModule = function () {
    'use strict';
    function FormModule() {
    }
    FormModule.annotations = {
        services: [
            FormControlService,
            FormFieldControlService,
            FormValidatorService
        ],
        selectors: [
            FormControlDirective,
            FormFieldControlDirective,
            FormFieldDirective,
            DefaultEventBinder,
            ModelDirective,
            CheckboxEventBinder,
            RadioEventBinder,
            SelectEventBinder
        ]
    };
    return FormModule;
}();
exports.FormModule = FormModule;
exports.FormControlDirective = FormControlDirective;
exports.FormControlService = FormControlService;
exports.FormControlAbstract = FormControlAbstract;
exports.FormFieldControlDirective = FormFieldControlDirective;
exports.FormFieldControlService = FormFieldControlService;
exports.FormFieldDirective = FormFieldDirective;
exports.FormValidatorService = FormValidatorService;
exports.DefaultEventBinder = DefaultEventBinder;
exports.VALUE_ACCESSOR = VALUE_ACCESSOR;
exports.AbstractValueAccessor = AbstractValueAccessor;
exports.CheckboxEventBinder = CheckboxEventBinder;
exports.RadioEventBinder = RadioEventBinder;
exports.SelectEventBinder = SelectEventBinder;
exports.ModelDirective = ModelDirective;
exports.getValueAccessor = getValueAccessor;
},
'dist/http/bundles/jeli-http-module.js': function(exports){
var core = __required('dist/core/bundles/jeli-core-module.js');
var ProviderToken = core['ProviderToken'];
var INITIALIZERS = core['INITIALIZERS'];
var ChangeDetector = core['ChangeDetector'];
var HttpInterceptor = function () {
    'use strict';
    function HttpInterceptor(interceptors) {
        this.resolveInterceptor = function (state, options) {
            if (interceptors.length) {
                interceptors.forEach(function (interceptorInstance) {
                    options = interceptorInstance[state].apply(interceptorInstance, [options]);
                });
            }
            return options;
        };
        this.register = function () {
            interceptors = interceptors.map(function (interceptorFactory) {
                if ($isString(interceptorFactory)) {
                    return DependencyInjectorService.get(interceptorFactory);
                } else {
                    return DependencyInjectorService.inject(interceptorFactory);
                }
            });
        };
    }
    HttpInterceptor.annotations = {
        DI: {
            interceptors: {
                optional: true,
                type: 'Token?'
            }
        }
    };
    return HttpInterceptor;
}();
var RegisterInterceptors = function () {
    'use strict';
    function RegisterInterceptors(httpInterceptors) {
        httpInterceptors.register();
    }
    RegisterInterceptors.annotations = { DI: { HttpInterceptor: { factory: HttpInterceptor } } };
    return RegisterInterceptors;
}();
var HttpService = function () {
    'use strict';
    function HttpService(interceptor, changeDetector) {
        return AjaxSetup(interceptor, changeDetector);
    }
    HttpService.annotations = {
        DI: {
            HttpInterceptor: { factory: HttpInterceptor },
            ChangeDetector: { internal: true }
        }
    };
    return HttpService;
}();
var INTERCEPTORS = new ProviderToken('interceptors', true);
var HttpModule = function () {
    'use strict';
    function HttpModule() {
    }
    INITIALIZERS.register(RegisterInterceptors);
    HttpModule.annotations = {
        services: [
            HttpInterceptor,
            HttpService
        ]
    };
    return HttpModule;
}();
exports.INTERCEPTORS = INTERCEPTORS;
exports.HttpModule = HttpModule;
exports.RegisterInterceptors = RegisterInterceptors;
exports.HttpInterceptor = HttpInterceptor;
exports.HttpService = HttpService;
},
'viewers/Todo/src/app/components/test-place.js': function(exports){
var core = __required('dist/core/bundles/jeli-core-module.js');
var ViewParser = core['ViewParser'];
/** compiled TestPlaceElement **/
var TestPlaceElement = function(){
"use strict";

function TestPlaceElement(elementRef) {
    this.test = false;
    this.html = '';
}

TestPlaceElement.annotations = {
    selector: 'test-place',
    DI: {
        ElementRef: {
            optional: true
        }
    },
    module: 'AppModule'
};

TestPlaceElement.view = /** jeli template **/ new ViewParser([{"type":"place","name":"#fragment","index":0,"isc":false}], {}) /** template loader **/;
return TestPlaceElement;
}();

exports.TestPlaceElement = TestPlaceElement;
},
'viewers/Todo/src/app/components/item-list.js': function(exports){
var core = __required('dist/core/bundles/jeli-core-module.js');
var ViewParser = core['ViewParser'];
/** compiled ItemList **/
var ItemList = function(){
"use strict";

function ItemList() {
}

ItemList.annotations = {
    selector: 'item-list',
    props: {
        value: {}
    },
    module: 'AppModule'
};

ItemList.view = /** jeli template **/ new ViewParser([{"type":"place","name":"#fragment","index":0,"isc":false}], {}) /** template loader **/;
return ItemList;
}();

exports.ItemList = ItemList;
},
'viewers/Todo/src/app/app.component.js': function(exports){
var CalculatorComponent = __required('viewers/Todo/src/app/components/calculator/calculator.js')['CalculatorComponent'];
var TestPlaceElement = __required('viewers/Todo/src/app/components/test-place.js')['TestPlaceElement'];
var common = __required('dist/common/bundles/jeli-common-module.js');
var ClassDirective = common['ClassDirective'];
var IfDirective = common['IfDirective'];
var SwitchDefaultDirective = common['SwitchDefaultDirective'];
var SwitchCaseDirective = common['SwitchCaseDirective'];
var SwitchDirective = common['SwitchDirective'];
var ForDirective = common['ForDirective'];
var core = __required('dist/core/bundles/jeli-core-module.js');
var ViewParser = core['ViewParser'];
var form = __required('dist/form/bundles/jeli-form-module.js');
var DefaultEventBinder = form['DefaultEventBinder'];
var ModelDirective = form['ModelDirective'];
var CheckboxEventBinder = form['CheckboxEventBinder'];
var FormControlService = form['FormControlService'];
/** compiled AppRootElement **/
var AppRootElement = function(){
"use strict";

function AppRootElement(formControlService) {
    this.test = true;
    this.testForm = new formControlService({
        radio: {
            value: 1,
            required: true
        },
        input: {
            value: undefined,
            disabled: true,
            validators: {
                required: true,
                minlength: 6
            }
        },
        textarea: {
            value: 'Testing the default value',
            disabled: false,
            validators: {
                required: true,
                minlength: 6,
                maxlength: 100
            }
        },
        checkbox: {
            value: true,
            validators: { required: true }
        },
        select: {
            value: 'select_2',
            validators: { required: true }
        },
        file: { validators: { required: true } },
        range: {
            value: 0,
            validators: { maxlength: 90 }
        },
        number: { value: 500 }
    });
    this.error = false;
    this.keys = [2];
    this.removeKey = function (key) {
        this.keys.splice(key, 1);
    };
    this.selectItemTest = [];
    for (var i = 0; i < 100; i++) {
        this.selectItemTest.push({
            label: 'test_' + i,
            value: i
        });
    }
    this.selectedItem = this.selectItemTest[30];
    this.pageHeading = 'My First Todo App';
    this.todos = [];
    this.removeItemCount = 0;
    this.counter = 0;
    this.todoDescription = '';
    this.range = function (start, end) {
        var value = [];
        while (end > start) {
            value.push(start);
            start++;
        }
        return value;
    };
    this.didInit = function () {
        this.generateMock(1);
        this.testForm.patchValue({ number: 10 });
        this.testForm.addField('personalInfo', new formControlService({
            firstName: {
                value: null,
                validators: { required: true }
            },
            lastName: {
                value: null,
                validators: { required: true }
            },
            age: {
                value: null,
                validators: { required: true }
            }
        }));
        console.log(this.testForm);
    };
}
AppRootElement.prototype.addTodo = function () {
    if (this.todoDescription) {
        this.todos.push({
            description: this.todoDescription,
            done: false
        });
        this.todoDescription = '';
    }
};
AppRootElement.prototype.removeTodo = function (index) {
    console.log('removing Todo:', index);
    if (this.todos[index]) {
        this.todos.splice(index, 1);
    }
};
AppRootElement.prototype.markAsRemoved = function (done) {
    if (done) {
        this.removeItemCount++;
    } else {
        this.removeItemCount--;
    }
};
AppRootElement.prototype.generateMock = function (total) {
    var data = [];
    for (var i = 0; i < total; i++) {
        data.push({
            description: 'Test_From_' + this.counter++,
            done: false
        });
    }
    this.todos = data;
    data = null;
};

AppRootElement.annotations = {
    selector: 'app-root',
    DI: {
        FormControlService: {
            factory: FormControlService
        }
    },
    viewChild: {
        testPlace: {
            value: '#testPlace'
        },
        model: {
            value: 'model',
            isdir: true
        }
    },
    module: 'AppModule'
};

AppRootElement.view = /** jeli template **/ new ViewParser([{"type":"element","name":"nav","index":0,"isc":false,"attr":{"class":"navbar navbar-inverse navbar-static-top"},"children":[{"type":"element","name":"div","index":0,"isc":false,"attr":{"class":"container-fluid"},"children":[{"type":"element","name":"div","index":0,"isc":false,"attr":{"class":"navbar-header"},"children":[{"type":"element","name":"a","index":0,"isc":false,"attr":{"class":"navbar-brand","href":"#"},"children":[{"type":"text","ast":{"rawValue":" Todo Application "}}]}]}]}]},{"type":"element","name":"div","index":2,"isc":false,"children":[{"type":"element","name":"h5","index":0,"isc":false,"children":[{"type":"text","ast":{"rawValue":"Attr-Selected"}}]},{"type":"element","name":"select","index":1,"isc":false,"children":[{"type":"element","name":"#comment","text":"for","templates":{"for":{"type":"element","name":"option","index":0,"isc":false,"context":{"i":"$context"},"attrObservers":{"selected":{"prop":{"type":"bin","context":"i","operator":"===","values":1},"once":true}},"children":[{"type":"text","ast":{"rawValue":"${0}","_":1,"templates":[{"replace":"${0}","exp":{"prop":"i"}}]}}]}},"props":{"forIn":[0,1,2,4]},"providers":[ForDirective]}]}]},{"type":"element","name":"test-place","index":3,"isc":true,"refId":"testPlace","providers":[TestPlaceElement],"children":[],"templates":{"place":[{"type":"element","name":"input","index":0,"isc":false,"attr":{"type":"checkbox"},"props":{"model":"test"},"providers":[CheckboxEventBinder,ModelDirective],"events":[{"name":"modelChange","value":[{"type":"ant","left":"test","right":"$event"}],"custom":true}]},{"type":"element","name":"div","index":1,"isc":false,"children":[{"type":"element","name":"h5","index":0,"isc":false,"children":[{"type":"text","ast":{"rawValue":"Attr-Value"}}]},{"type":"element","name":"input","index":1,"isc":false,"attr":{"type":"text"},"attrObservers":{"value":{"prop":"test","once":false},"readonly":{"prop":true,"once":true}}}]},{"type":"element","name":"h5","index":2,"isc":false,"children":[{"type":"text","ast":{"rawValue":"Attr-Style (background)"}}]},{"type":"element","name":"div","index":3,"isc":false,"attrObservers":{"style":{"prop":{"type":"obj","expr":{"background":{"type":"ite","test":"test","cons":"#fff","alt":"#000"}}},"once":false}},"children":[{"type":"text","ast":{"rawValue":"I am a test"}}]},{"type":"element","name":"div","index":4,"isc":false,"children":[{"type":"element","name":"h5","index":0,"isc":false,"children":[{"type":"text","ast":{"rawValue":"Attr-innerHTML"}}]},{"type":"element","name":"textarea","index":1,"isc":false,"props":{"model":"html"},"providers":[DefaultEventBinder,ModelDirective],"events":[{"name":"modelChange","value":[{"type":"ant","left":"html","right":"$event"}],"custom":true}]},{"type":"element","name":"div","index":2,"isc":false,"attrObservers":{"innerhtml":{"prop":"html","once":false}}}]},{"type":"element","name":"div","index":5,"isc":false,"props":{"switch":"test"},"providers":[SwitchDirective],"children":[{"type":"element","name":"#comment","text":"switchCase","templates":{"switchCase":{"type":"element","name":"h5","index":0,"isc":false,"children":[{"type":"text","ast":{"rawValue":"I am ${0} case","_":1,"templates":[{"replace":"${0}","exp":{"prop":"test"}}]}}]}},"props":{"switchCase":true},"providers":[SwitchCaseDirective]},{"type":"element","name":"#comment","text":"switchDefault","templates":{"switchDefault":{"type":"element","name":"h4","index":1,"isc":false,"children":[{"type":"text","ast":{"rawValue":"I am default switch element"}}]}},"providers":[SwitchDefaultDirective]}]}]}},{"type":"element","name":"input","index":4,"isc":false,"attr":{"type":"checkbox"},"props":{"model":"test"},"providers":[CheckboxEventBinder,ModelDirective],"events":[{"name":"modelChange","value":[{"type":"ant","left":"test","right":"$event"}],"custom":true}],"attrObservers":{"checked":{"prop":true,"once":true}}},{"type":"element","name":"#comment","text":"if","templates":{"if":{"type":"element","name":"div","index":5,"isc":false,"children":[{"type":"text","ast":{"rawValue":"I am Test Condition"}}]},"ifElse":{"refId":"fallback","type":"element","name":"#fragment","index":6,"isc":false,"children":[{"type":"element","name":"#comment","text":"for","templates":{"for":{"type":"element","name":"div","index":0,"isc":false,"context":{"i":"$context"},"children":[{"type":"text","ast":{"rawValue":"Testing_${0}","_":1,"templates":[{"replace":"${0}","exp":{"prop":"i"}}]}}]}},"props":{"forIn":[0,1,2,3]},"providers":[ForDirective]}]}},"props":{"if":"test","ifElse":"fallback"},"providers":[IfDirective]},{"type":"element","name":"div","index":7,"isc":false,"props":{"class":{"type":"ite","test":"test","cons":"visible","alt":"hidden"}},"providers":[ClassDirective],"children":[{"type":"text","ast":{"rawValue":"Class test"}}]},{"type":"text","ast":{"rawValue":"currentValue: ${0}","_":1,"templates":[{"replace":"${0}","exp":{"prop":"test"}}]}},{"type":"element","name":"#comment","text":"if","templates":{"if":{"type":"element","name":"app-calculator","index":9,"isc":true,"providers":[CalculatorComponent]}},"props":{"if":"test"},"providers":[IfDirective]}], {}) /** template loader **/;
return AppRootElement;
}();

exports.AppRootElement = AppRootElement;
},
'viewers/Todo/src/app/components/calculator/calculator.js': function(exports){
var core = __required('dist/core/bundles/jeli-core-module.js');
var ViewParser = core['ViewParser'];
/** compiled CalculatorComponent **/
var CalculatorComponent = function(){
"use strict";

function CalculatorComponent() {
    this.clear();
}
CalculatorComponent.prototype.getNumber = function (v) {
    console.log(v);
    if (this.waitForSecondNumber) {
        this.currentNumber = v;
        this.waitForSecondNumber = false;
    } else {
        this.currentNumber === '0' ? this.currentNumber = v : this.currentNumber += v;
    }
};
CalculatorComponent.prototype.getDecimal = function () {
    if (!this.currentNumber.includes('.')) {
        this.currentNumber += '.';
    }
};
CalculatorComponent.prototype.doCalculation = function (op, secondOp) {
    switch (op) {
    case '+':
        return this.firstOperand += secondOp;
    case '-':
        return this.firstOperand -= secondOp;
    case '*':
        return this.firstOperand *= secondOp;
    case '/':
        return this.firstOperand /= secondOp;
    case '=':
        return secondOp;
    }
};
CalculatorComponent.prototype.getOperation = function (op) {
    if (this.firstOperand === null) {
        this.firstOperand = Number(this.currentNumber);
    } else if (this.operator) {
        const result = this.doCalculation(this.operator, Number(this.currentNumber));
        this.currentNumber = String(result);
        this.firstOperand = result;
    }
    this.operator = op;
    this.waitForSecondNumber = true;
};
CalculatorComponent.prototype.clear = function () {
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
};

CalculatorComponent.annotations = {
    selector: 'app-calculator',
    module: 'AppModule'
};

CalculatorComponent.view = /** jeli template **/ new ViewParser([{"type":"element","name":"div","index":0,"isc":false,"attr":{"class":"calculator"},"children":[{"type":"element","name":"input","index":0,"isc":false,"attr":{"type":"text","class":"calculator-screen","disabled":""},"attrObservers":{"value":{"prop":"currentNumber","once":false}}},{"type":"element","name":"div","index":1,"isc":false,"attr":{"class":"calculator-keys"},"children":[{"type":"element","name":"button","index":0,"isc":false,"attr":{"type":"button","class":"operator","value":"+"},"events":[{"name":"click","value":[{"type":"'call'","args":["+"],"fn":"getOperation"}]}],"children":[{"type":"text","ast":{"rawValue":"+"}}]},{"type":"element","name":"button","index":1,"isc":false,"attr":{"type":"button","class":"operator","value":"-"},"events":[{"name":"click","value":[{"type":"'call'","args":["-"],"fn":"getOperation"}]}],"children":[{"type":"text","ast":{"rawValue":"-"}}]},{"type":"element","name":"button","index":2,"isc":false,"attr":{"type":"button","class":"operator","value":"*"},"events":[{"name":"click","value":[{"type":"'call'","args":["*"],"fn":"getOperation"}]}],"children":[{"type":"text","ast":{"rawValue":"&times;"}}]},{"type":"element","name":"button","index":3,"isc":false,"attr":{"type":"button","class":"operator","value":"/"},"events":[{"name":"click","value":[{"type":"'call'","args":["/"],"fn":"getOperation"}]}],"children":[{"type":"text","ast":{"rawValue":"&divide;"}}]},{"type":"element","name":"button","index":4,"isc":false,"attr":{"type":"button","value":7},"events":[{"name":"click","value":[{"type":"'call'","args":["7"],"fn":"getNumber"}]}],"children":[{"type":"text","ast":{"rawValue":"7"}}]},{"type":"element","name":"button","index":5,"isc":false,"attr":{"type":"button","value":8},"events":[{"name":"click","value":[{"type":"'call'","args":["8"],"fn":"getNumber"}]}],"children":[{"type":"text","ast":{"rawValue":"8"}}]},{"type":"element","name":"button","index":6,"isc":false,"attr":{"type":"button","value":9},"events":[{"name":"click","value":[{"type":"'call'","args":["9"],"fn":"getNumber"}]}],"children":[{"type":"text","ast":{"rawValue":"9"}}]},{"type":"element","name":"button","index":7,"isc":false,"attr":{"type":"button","value":4},"events":[{"name":"click","value":[{"type":"'call'","args":["4"],"fn":"getNumber"}]}],"children":[{"type":"text","ast":{"rawValue":"4"}}]},{"type":"element","name":"button","index":8,"isc":false,"attr":{"type":"button","value":5},"events":[{"name":"click","value":[{"type":"'call'","args":["5"],"fn":"getNumber"}]}],"children":[{"type":"text","ast":{"rawValue":"5"}}]},{"type":"element","name":"button","index":9,"isc":false,"attr":{"type":"button","value":6},"events":[{"name":"click","value":[{"type":"'call'","args":["6"],"fn":"getNumber"}]}],"children":[{"type":"text","ast":{"rawValue":"6"}}]},{"type":"element","name":"button","index":10,"isc":false,"attr":{"type":"button","value":true},"events":[{"name":"click","value":[{"type":"'call'","args":["1"],"fn":"getNumber"}]}],"children":[{"type":"text","ast":{"rawValue":"1"}}]},{"type":"element","name":"button","index":11,"isc":false,"attr":{"type":"button","value":2},"events":[{"name":"click","value":[{"type":"'call'","args":["2"],"fn":"getNumber"}]}],"children":[{"type":"text","ast":{"rawValue":"2"}}]},{"type":"element","name":"button","index":12,"isc":false,"attr":{"type":"button","value":3},"events":[{"name":"click","value":[{"type":"'call'","args":["3"],"fn":"getNumber"}]}],"children":[{"type":"text","ast":{"rawValue":"3"}}]},{"type":"element","name":"button","index":13,"isc":false,"attr":{"type":"button","value":false},"events":[{"name":"click","value":[{"type":"'call'","args":["0"],"fn":"getNumber"}]}],"children":[{"type":"text","ast":{"rawValue":"0"}}]},{"type":"element","name":"button","index":14,"isc":false,"attr":{"type":"button","class":"decimal","value":"."},"events":[{"name":"click","value":[{"type":"'call'","args":[],"fn":"getDecimal"}]}],"children":[{"type":"text","ast":{"rawValue":"."}}]},{"type":"element","name":"button","index":15,"isc":false,"attr":{"type":"button","class":"all-clear","value":"all-clear"},"events":[{"name":"click","value":[{"type":"'call'","args":[],"fn":"clear"}]}],"children":[{"type":"text","ast":{"rawValue":"AC"}}]},{"type":"element","name":"button","index":16,"isc":false,"attr":{"type":"button","class":"equal-sign","value":"="},"events":[{"name":"click","value":[{"type":"'call'","args":["="],"fn":"getOperation"}]}],"children":[{"type":"text","ast":{"rawValue":"="}}]}]}]}], {}) /** template loader **/;
return CalculatorComponent;
}();

exports.CalculatorComponent = CalculatorComponent;
}
}; var __resolved__ = {}; 
function __required(deps){  if(__resolved__[deps]){ return __resolved__[deps]; } /** create a new ref **/ __resolved__[deps] = {}; __JELI__DEPENDENCY__HUB__[deps](__resolved__[deps]); return __resolved__[deps];};
 /** trigged factory **/
factory(__required);
}(function(__required){
var bootStrapApplication = __required('dist/core/bundles/jeli-core-module.js')['bootStrapApplication'];
var AppModule = __required('viewers/Todo/src/app/app.module.js')['AppModule'];

bootStrapApplication(AppModule);
});