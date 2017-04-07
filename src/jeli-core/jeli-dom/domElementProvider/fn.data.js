  /*
    jEliQuery Data Fn

  */
var $data = {},
  EDS = {},
  EUID = 0;
domElementProvider.data = function (key, value)
{
  if (this.length)
  {
    var self = this[0];

    function getStorage()
    {
      //generate new element ID
      var duid = getElementStorageID(self);
      //if id not in watchList
      //create a new Object WatchList
      if (!EDS[duid])
      {
        EDS[duid] = extend({}, inlineAttribute());
      } 

      //return the newly created element Data
      return EDS[duid];
    }

    function getElementStorageID(ele)
    {
      if(!isValidElement(ele)){ return; } 

      //generate a new ref ID
      if(!ele[OBJ_REF])
      {
        ele[OBJ_REF] = EUID++;
      }
      //return the ID
      return ele[OBJ_REF] ? ele[OBJ_REF] : EUID;
    }

    function store()
    {
      if (!value && $isObject(key))
      {
        EDS[getElementStorageID(self)] = extend(getStorage(), key);
      } else
      {
        EDS[getElementStorageID(self)][key] = value;
      }
    }

    function retrieve()
    {
      if (key && !value && typeof key === 'string')
      {
        return getStorage()[key]; 
      }
       else
       {
          return getStorage();
       }
    }

    function inlineAttribute()
    {
      var attr = self.attributes,
          ret = {},
          val,
          i;
      if (attr && attr.length)
      {
        for (i = 0; i <= attr.length - 1; i++)
        {
          if (attr[i].nodeName.indexOf('-') > - 1)
          {
            if ($isJsonString(attr[i].value) && !new RegExp(_defaultTemplateExp).test(attr[i].value))
            {
              val = maskedEval(attr[i].value) || attr[i].value;
            }
            else
            {
              val = attr[i].value;
            }
            
            ret[attr[i].nodeName.split('-').slice(1).join('')] = val;
          }
        }
      }
      return ret;
    }

    if (arguments.length === 2 || $isObject(key))
    {
      store();
    }else{
      return retrieve();
    }
  }
  
  return this;
};

    domElementProvider.removeData  = function(key)
    {
      if(key && this[0])
      {
        var data = this.data();
            delete data[key];
        this.data(data);
      }

      return this;
    };