

<template>
  
   <div class="gauge__outer">
    <div class="gauge__top-text">0.0</div>  <!-- represent the start point of the gauge -->  
      <div class="gauge__top-text">50.00</div> <!-- represent the middle point of the gauge --> 
      <div class="gauge__top-text">100.00</div> <!-- represent the end point of the gauge --> 
    
    <div class="gauge__inner">
      
      <div class="gauge__fill" :style="fillStyles"></div> <!-- the fiiling of the gauge -->
      <div class="gauge__gradient"></div> <!-- the gradient of the gauge -->
      <div class="gauge__cover">
        <div class="gauge__dial">
          <div class="gauge__needle" :style="{ transform: cssTransformRotateValue }"></div> <!-- the needle of the gauge -->
        </div>
       <div class="gauge__percentage">{{ percentage.toFixed(2) }}%</div>  <!-- the precentage value of gauge -->
      </div>
   
    </div>
  </div>
    

</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  percentage: {
    type: Number,
    required: true
  }
});


const cssTransformRotateValue = computed(() => `rotate(${(props.percentage * 1.8) - 90}deg)`);   // calculate the rotation value for the gauge needle based on the percentage

const cssTransformValue = computed(() => {              
  const percentageAsFraction = props.percentage / 100;   //Convert percentage to a 0 to 1
  const halfPercentage = percentageAsFraction / 2;   // take a half of it
  return `${halfPercentage}turn`;  
});


// calculate the rotation and background color for the gauge fill based on the percentage
const fillStyles = computed(() => {
  const gradientColor = getGradientColor(props.percentage);
  return {
    transform: `rotate(${cssTransformValue.value})`,
    background: `linear-gradient(white, ${gradientColor})`
  };
});

//claculate the gradient colour based on the precentage
function getGradientColor(percentage) {
  if (percentage <= 50) {
    const ratio = percentage / 50;
    const r = Math.floor(225 + (30 * ratio));
    const g = Math.floor(202 - (93 * ratio));
    const b = Math.floor(70 + (110 * ratio));
    return `rgb(${r},${g},${b})`;
  } else {
    const ratio = (percentage - 50) / 50;
    const r = Math.floor(117 + (96 * ratio));
    const g = Math.floor(201 - (145 * ratio));
    const b = Math.floor(82 + (73 * ratio));
    return `rgb(${r},${g},${b})`;
  }
}
</script>
  
 
<style scoped>
.gauge__outer {
  position:relative;
  width: 250px;
  max-width: 250px;
}


.gauge__inner {
  width: 100%;
  height: 0;
  padding-bottom: 50%;
  background: #b4c0be;
  position: relative;
  border-top-left-radius: 100% 200%;
  border-top-right-radius: 100% 200%;
  overflow: hidden;
 
}

.gauge__fill {
  position: absolute;
  top: 100%;
  left:0;
  width: inherit;
  height: 100%;
  background-color:transparent;
  transform-origin: center top;
  transform: rotate(0.25turn);
  transition: transform 0.2s ease-out;
 
}

.gauge__cover {
  width: 75%;
  height: 150%;
  background: #ffffff;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;

  display: flex;
  color: #333;
  align-items: center;
  justify-content: center;
  padding-bottom: 25%;
  box-sizing: border-box;
  font-family: 'Lexend', sans-serif;
  font-weight: bold;
  font-size: 28px;
  
}

.gauge__gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to top, #E1CA46 0%,  #75C952 50%, #469ED5 100%);  
  opacity: 0.8; 
}



.gauge__dial {
  position: absolute;
  width: 100%;
  height: 100%;
}

.gauge__needle {
  position: absolute;
  left: 50%;
  bottom: 70%;
  transform-origin: bottom;
  width: 8px;
  height: 20%;
  transform-origin: bottom;
  background: #333;
  border-top-left-radius: 20px;  
  border-top-right-radius: 20px; 
}

.gauge__top-text {
  position: absolute;
  color: #333;
  font-size: 16px; 
}

.gauge__top-text:nth-child(1) {  /* represent the style of start point of the gauge */
  bottom: -15%;
  right: 100%;
  transform: translateX(-50%) translateY(-50%);
}

.gauge__top-text:nth-child(2) {  /* represent the style of middle point of the gauge */
  top: -8%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  
}

.gauge__top-text:nth-child(3) { /* represent the style of end point of the gauge */
  bottom: -14%;
  left: 112%;
  transform: translateX(-50%) translateY(-50%);
 
}


</style>