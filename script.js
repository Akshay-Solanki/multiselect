
class Multiselect {
  constructor(element) {
    this.element = document.getElementById(element);
    this.createMultiselect();
    this.selectInput()
  }

  createMultiselect(){
    var parent = this.element.parentNode;
    var wrapper = document.createElement('div');
    var wrapperClass = document.createAttribute('class')
    wrapperClass.value = 'multiselect'
    wrapper.attributes.setNamedItem(wrapperClass)
    // set the wrapper as child (instead of the element)
    parent.replaceChild(wrapper, this.element);
    // set element as child of wrapper
    wrapper.appendChild(this.element);

    var msb = document.createElement('div')
    var msbcls = document.createAttribute('class');
    msbcls.value = 'multiselect-box';
    msb.attributes.setNamedItem(msbcls)
    msb.innerHTML = '<div class="multiselect-values-container">'
          +'<div class="multiselect-values">'
          +'</div>'
          +'<div class="multiple-down"></div>'
        +'</div>'
        +'<div class="multiselect-input-container">'
          +'<input type="text" class="multiselect-input">'
        +'</div>'
    // options-container
    var oc =  document.createElement('div')
    var occls = document.createAttribute('class');
    occls.value = 'option-container';
    oc.attributes.setNamedItem(occls);
    Array.from(this.element.children).forEach(item => {
      var option = document.createElement('div')
      var optionClass = document.createAttribute('class')
      optionClass.value = 'option'
      var optionData = document.createAttribute('data-value')
      optionData.value = item.value;
      option.attributes.setNamedItem(optionClass)
      option.attributes.setNamedItem(optionData)
      var optionValue = document.createElement('span')
      optionValue.innerText = item.innerText;
      option.append(optionValue);
      oc.append(option)
      console.log(item.value)
    })
    console.log(oc)
    msb.appendChild(oc);
    wrapper.appendChild(msb)
    // set element as child of wrapper
    wrapper.appendChild(this.element);
  }

  selectInput() {
    const self = this
    this.element.parentElement.getElementsByClassName('multiselect-values')[0]
      .addEventListener('click', function (ele) {
        const inputContainer = ele.target.parentElement.parentElement.getElementsByClassName('multiselect-input-container')[0]
        inputContainer.style.display = 'block'
        inputContainer.children[0].focus();
        self.createInputListner(inputContainer.children[0])
        self.createSearchbox(inputContainer.children[0])
        const optionContainer = ele.target.parentElement.parentElement.getElementsByClassName('option-container')[0]
        optionContainer.style.display = 'block'
      })
    self.optionSelector(this.element.parentElement.getElementsByClassName('option-container')[0])
  }

  createInputListner(inputElement){
    inputElement.addEventListener('blur', function(ele){
      setTimeout(() =>{ 
        ele.target.parentElement.style.display = 'none'
        ele.target.parentElement.parentElement.getElementsByClassName('option-container')[0].style.display = 'none'
      },200);
    })
  }

  createSearchbox(inputElement){
    inputElement.addEventListener('keyup', function(ele){
      const options = ele.target.parentElement.parentElement.getElementsByClassName('option-container')[0].children;

      if(ele.target.value == ''){
        Array.from(options).forEach(optionElement => {
          optionElement.style.display = 'block'
        });        
      }else{
        Array.from(options).forEach(optionElement => {
          optionElement.childNodes.item(0).innerText.toLowerCase().includes(ele.target.value.toLowerCase()) 
            ? optionElement.style.display = 'block'
            : optionElement.style.display = 'none'
        })
      }
    })
  }

  optionSelector(optionContainer){
    Array.from(optionContainer.children).forEach(option => {
      option.addEventListener('click', (ele)=>{
        option.classList.remove('select')
        Array.from(this.element.children).forEach((item) => {
          if(item.value == option.attributes['data-value']?.value){
            item.selected = !item.selected 
            if(item.selected){
              option.classList.add('select')
            }
            this.createTag(item,item.selected)
          }  
        })
      })
    })
  }
  createTag(item, add){
    var tagContainer = this.element.parentElement.getElementsByClassName('multiselect-values')[0]
    var tags = tagContainer.children;

    if(!add){
      Array.from(tags).forEach(tag => {
        if(tag.attributes.getNamedItem('data-value').value == item.value){
          tag.remove()
        }
      })
      return true;
    }
    var nTag = document.createElement('div')
    nTag.setAttribute('class','tag')
    nTag.setAttribute('data-value',item.value)

    var nTagSpan = document.createElement('span')
    nTagSpan.innerText=item.innerText;
    var nTagSpan2 = document.createElement('span')
    nTagSpan2.setAttribute('class','remove')
    nTagSpan2.innerHTML='&times;';
    nTag.appendChild(nTagSpan)
    nTag.appendChild(nTagSpan2)
    

    tagContainer.appendChild(nTag)
    
    nTag.addEventListener('click' , (evt) => {
      evt.stopPropagation()
      item.selected = false
      document.querySelector('.select[data-value="'+item.value+'"]')?.classList.remove('select')
      if(evt.target.attributes['data-value']?.value== item.value){
        evt.target.remove();
        return false;
      }
      evt.target.parentElement.remove();
    })
  }
}
