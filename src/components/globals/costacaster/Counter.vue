<template>
  <div class="mp-count">
    <button class="dec" @click="decrement"><span>-</span></button>
    <span class="counter-txt reltv-span">{{ count }}</span>
    <button class="dec" @click="increment"><span>+</span></button>
  </div>
</template>
  
<script>
export default {
  props: {
    productStock: Number,
    quantity: Number,
    productId: Number,
  },
  data() {
    return {
      count: this.quantity,
    };
  },
  methods: {
    increment() {
      if (this.count < this.productStock) {
        this.count++;
        this.$emit('setQuantityOfProduct', this.count, this.productId)
      }
    },
    decrement() {
      if (this.count > 0) {
        this.count--;
        this.$emit('setQuantityOfProduct', this.count, this.productId)
      }
    },
  },
};
</script>

<style>
.counter-txt {
  color: #E73C31;
  font-family: Philosopher;
  font-size: 60px;
}

.dec {
  width: 44px;
  height: 42px;
  flex-shrink: 0;
  background: #D9D9D9;
  border: none;
  font-size: 45px;
}

.dec span {
  position: relative;
  top: -9px;
}

.mp-count {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.reltv-span {
  position: relative;
  top: -12px;
}
</style>
  