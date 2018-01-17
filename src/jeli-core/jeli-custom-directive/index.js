/**
  jEli DefualtElement Compiler
  jEli Custom Directives  : 
  'j-controller',
  'j-init',
  'j-if',
  'j-href',
  'j-src',
  'j-include',
  'j-for',
  'j-do',
  'j-hide',
  'j-show',
  'j-class',
  'j-style',
  'j-disabled',
  'j-model',
  'j-value',
  'j-html',
  'j-checked',
  'j-selected',
  'j-switch',
  'j-cloak',
  'j-max',
  'j-min'
  'j-readonly'
  'j-pattern'
  'j-place'
**/
var $defaultDirectiveProvider = [];
// set j-initProvider
$defaultDirectiveProvider.push({
    selector: "j-init",
    priority: 1,
    isDefault: true
});

/**
 * 
 * @param {*} type 
 */
function defaultElementInitializer(type) {}

/**

  Function defaultElementBinder
  @Param: ELEMENT, MODEL, REF
  @return defaultElementBinder Instance

**/

function defaultElementBinder(dir, ele, $model, ref) {

    var set = dir.selector.split('-')[1],
        type = hasAnyAttribute(ele, [dir.selector, ':' + set], "*") || ele.getAttribute('source');

    var binding = elementProcessor({
        type: set,
        elem: ele,
        $model: $model,
        ref: ref,
        checker: type
    });
    //create a new instance WatchList
    if (binding) {
        $directivesProviderWatchList.$push($model.$mId, binding);
        binding(ref);
    }
}


/**
  @Function elementProcessor
  Initialize the required Directive
  @return Function (binded)
**/
function elementProcessor(definition) {
    var ret = null;
    /*  
      switch case when
      j-MODEL
      j-CONTROLLER
      j-INIT
    */
    switch (definition.type) {
        case ("controller"):
            initializeController.call(definition);
            break;
        case ("init"):
            new jEliFnInitializer(definition.checker).evaluate(definition.$model);
            break;
        case ("model"):
            ret = prepareModel.call(generateArg.call(definition));
            break;
        default:
            ret = defaultBinder.call(null, generateArg.call(definition));
            break;
    }

    return ret;
}

function defaultBinder(definition) {
    // trigger the watch
    return function() {
        //initialize the required Function
        try {
            (defaultElementInitializer.prototype[definition.type] || noop).apply(definition);
        } catch (e) {
            if (typeof e === 'object') {
                throw new Error(e)
            }
        } finally {
            if (definition.bindOnce) {
                definition.$unWatch();
            }
        }
    };
}

function generateArg() {
    this.watchListIndex = $directivesProviderWatchList.$get(this.$model.$mId).length;
    this.$unWatch = function() {
        $directivesProviderWatchList.$removeFromArray(this.$model.$mId, this.watchListIndex);
    };

    this.$attr = buildAttributes(this.elem);
    /*
      Directive that transcludes
    */

    switch (this.type) {
        case ("for"):
        case ("do"):
        case ("include"):
        case ("if"):
        case ('switch'):
            //set the clone node for the object
            this.cSelector = camelCase.call('j-' + this.type);
            this.cache = [];
            this.replacerFn = domElementReplacerFn.call(this, this.cSelector, this.checker);
            // switchBuilder
            if (this.type === 'switch') {
                switchBuilder.call(this);
                this.elem.innerHTML = "";
            }

            break;
    }

    /**
     * check once directive
     */
    if (hasAnyAttribute(this.$attr, ["j-once", ":once"])) {
        this.bindOnce = true;
    }

    return this;
}