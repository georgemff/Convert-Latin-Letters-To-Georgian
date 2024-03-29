$(function(){
let isShift;
let isCapsLock = false;
const alphabet = "abgdevzTiklmnopJrstufqRySCcZwWxjh"
const appliedLettersForCaps = "tsrzcwj";
const appliedLettersForShift = "TSRZCWJ";

//Check if CapsLock is ON/OFF
    $('.lat-to-geo').on('keydown', function(e){
        isShift =  e.shiftKey ? e.shiftKey : ((isShift == 16) ? true : false);
        let charCode = e.key.charCodeAt();
        if(charCode <=90 && charCode >= 65 && isShift == false){
            isCapsLock = true;
        } else if(charCode <=90 && charCode >= 65 && isShift == true){
            isCapsLock = false;
        } else if(charCode <=122 && charCode >= 97 && isShift == true) {
            isCapsLock = true;
        } else if(charCode <=122 && charCode >= 97 && isShift == false) {
            isCapsLock = false;
        }
    });

//Convert Letters To Georgian
    $('.lat-to-geo').on('input', function(e){
        $('.lat-to-geo').each(function(){
            let value = $(this).val();
            let lastLetter;
            for (let i = 0; i < value.length; i++) {
                if(isCapsLock && !isShift){
                    value = value.toLowerCase();
                } else if (isCapsLock && isShift){
                    if(appliedLettersForCaps.indexOf(value[value.length - 1]) != -1) {
                        lastLetter = value[value.length - 1].toUpperCase();
                        value = value.slice(0, -1);
                        value += lastLetter;
                        isCapsLock = false;
                    }
                } else if (!isCapsLock && isShift) {
                    if(appliedLettersForShift.indexOf(value[value.length - 1]) == -1) {
                        lastLetter = value[value.length - 1].toLowerCase();
                        value = value.slice(0, -1);
                        value += lastLetter;
                        isShift = false;
                    }
                }
                if(alphabet.indexOf(value[i]) != -1){
                    value = value.replace(value[i], String.fromCharCode(alphabet.indexOf(value[i]) + 4304));
                    $(this).val(value);
                } else {
                	value = value.replace(value[i], value[i].toLowerCase());
                	if(alphabet.indexOf(value[i]) != -1){
	                    value = value.replace(value[i], String.fromCharCode(alphabet.indexOf(value[i]) + 4304));
	                    $(this).val(value);
                	}
                }
            }
        })
    })
})