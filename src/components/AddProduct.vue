<template>
    <section class="main-guest-section ">
        <SideBar @updateValue="updateValueFromHeader"></SideBar>
       <section :class="valueFromHeader ? 'guest-main-page-shop-header sidebar-section' : 'guest-main-page-shop-header sidebar-section1'">
            <GuestHeader></GuestHeader>
            <div class="products-main">
                <h1>
                    Add Products
                </h1>
                <form @submit.prevent="addProduct">
                    <div class="Products">
                        <p>
                            Name
                        </p>
                        <input placeholder="Enter Product Name..." type="text" v-model="v$.form.name.$model">
                        <div class="input-errors" v-for="(error, index) of v$.form.name.$errors" :key="index">
                            <div class="error-msg">{{ error.$message }}</div>
                        </div>
                    </div>
                    <div class="Products">
                        <p>
                            Brand
                        </p>
                        <select class="input drop-down-wrapper" v-model="v$.form.brand_id.$model">
                            <option value="" disabled>Please Select Brand</option>
                            <option v-for="brand in brands.data" :key="brand.id" :value="brand.id">
                                {{ brand.name }}
                            </option>
                        </select>
                    </div>
                    <div class="Products">
                        <p>
                            Category
                        </p>
                        <select class="input drop-down-wrapper" v-model="v$.form.category_id.$model">
                            <option value="" disabled>Please Select Category</option>
                            <option v-for="category in categories.data" :key="category.id" :value="category.id">
                                {{ category.name }}
                            </option>
                        </select>
                    </div>
                    <div class="Products">
                        <p>
                            Price
                        </p>
                        <input type="number" placeholder="Enter Product Price" v-model="v$.form.price.$model">
                        <div class="input-errors" v-for="(error, index) of v$.form.price.$errors" :key="index">
                            <div class="error-msg">{{ error.$message }}</div>
                        </div>
                    </div>
                    <div class="products-uploaded">
                        <p>
                            Images <span style="font-size: 14px;">(First Image will be Featured Image)</span>
                        </p>
                        <button @click.prevent="openFileInput">SELECT MEDIA</button>
                        <input ref="fileInput" type="file" style="display: none" multiple @change="handleFileSelect" />
                    </div>
                    <div v-if="previewImages.length > 0" class="image-preview">
                        <div v-for="(image, index) in previewImages" :key="index" class="preview-item">
                            <img :src="image.url" alt="Preview" class="image-preview-item" />
                            <span @click="removeImage(index)" class="remove-icon">X</span>
                        </div>
                    </div>
                    <div class="Products">
                        <p>Description</p>
                        <textarea name="" id="" cols="30" rows="10" placeholder="Enter Product Description..."
                            v-model="v$.form.description.$model"></textarea>
                        <div class="input-errors" v-for="(error, index) of v$.form.description.$errors" :key="index">
                            <div class="error-msg">{{ error.$message }}</div>
                        </div>
                    </div>

                    <h1>
                        Product Variation
                    </h1>
                    <div v-for="(variation, index) in this.form.variation" :key="index">
                        <div class="Products">
                            <p>
                                Product Variation Name
                            </p>
                            <input placeholder="Enter Variation Name..." type="text" v-model="variation.name">
                            <!-- <div class="input-errors" v-for="(error, i) of v$.form.variation[index].name.$errors" :key="i">
                                <div class="error-msg">{{ error.$message }}</div>
                            </div> -->
                        </div>
                        <div class="Products">
                            <p>
                                Size
                            </p>
                            <select class="input drop-down-wrapper" v-model="variation.size_id">
                                <option value="" disabled>Please Select Size</option>
                                <option v-for="size in sizes.data" :key="size.id" :value="size.id">
                                    {{ size.name }}
                                </option>
                            </select>
                        </div>
                        <div class="Products">
                            <p>
                                Color
                            </p>
                            <select class="input drop-down-wrapper" v-model="variation.color_id">
                                <option value="" disabled>Please Select Color</option>
                                <option v-for="color in colors.data" :key="color.id" :value="color.id">
                                    {{ color.name }}
                                </option>
                            </select>
                        </div>
                        <div class="Products">
                            <p>
                                Price
                            </p>
                            <input type="number" placeholder="Type Number" v-model="variation.price">
                        </div>
                        <div class="Products">
                            <p>
                                Quantity
                            </p>
                            <input type="number" placeholder="Enter Product Quantity" v-model="variation.stock_quantity">
                        </div>
                        <div v-if="index > 0" class="products-uploaded"
                            style="margin-top: 30px; margin-bottom: 20px; width: 30%;">
                            <button @click.prevent="removeVariation(index)">Remove Variation</button>
                        </div>
                    </div>
                    <div class="products-uploaded" style="margin-top: 30px; margin-bottom: 20px; width: 30%;">
                        <button @click.prevent="addVariation">Add More +</button>
                    </div>
                    <!-- <div class="Products">
                        <p>
                            Product Variation Name
                        </p>
                        <input placeholder="Enter Variation Name..." type="text"
                            v-model="v$.form.variations[0].name.$model">
                        <div class="input-errors" v-for="(error, index) of v$.form.variations[0].name.$errors" :key="index">
                            <div class="error-msg">{{ error.$message }}</div>
                        </div>
                    </div>
                    <div class="Products">
                        <p>
                            Size
                        </p>
                        <select class="input drop-down-wrapper" v-model="v$.form.variations[0].size_id.$model">
                            <option value="" disabled>Please Select Size</option>
                            <option v-for="size in sizes.data" :key="size.id" :value="size.id">
                                {{ size.name }}
                            </option>
                        </select>
                    </div>
                    <div class="Products">
                        <p>
                            Color
                        </p>
                        <select class="input drop-down-wrapper" v-model="v$.form.variations[0].color_id.$model">
                            <option value="" disabled>Please Select Color</option>
                            <option v-for="color in colors.data" :key="color.id" :value="color.id">
                                {{ color.name }}
                            </option>
                        </select>
                    </div>
                    <div class="Products">
                        <p>
                            Price
                        </p>
                        <input type="number" placeholder="Type Number" v-model="v$.form.variations[0].price.$model">
                        <div class="input-errors" v-for="(error, index) of v$.form.variations[0].price.$errors"
                            :key="index">
                            <div class="error-msg">{{ error.$message }}</div>
                        </div>
                    </div>
                    <div class="Products">
                        <p>
                            Quantity
                        </p>
                        <input type="number" placeholder="Enter Product Quantity"
                            v-model="v$.form.variations[0].stock_quantity.$model">
                        <div class="input-errors" v-for="(error, index) of v$.form.variations[0].stock_quantity.$errors"
                            :key="index">
                            <div class="error-msg">{{ error.$message }}</div>
                        </div>
                    </div> -->

                    <div style="margin-top: 20px;" class="products-uploaded">
                        <button type="submit" :disabled="v$.form.$invalid || isSubmitting ">Upload</button>
                    </div>
                </form>
            </div>
        </section>
    </section>
</template>
<script>
import GuestHeader from '@components/globals/guest/GuestHeader.vue';
import SideBar from '@components/globals/costacaster/SideBar.vue';
import { fetchData, postData } from '@services/base.js';
import useVuelidate from '@vuelidate/core';
import { required, numeric, minLength, maxLength } from '@vuelidate/validators';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export function validName(name) {
    let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
    if (validNamePattern.test(name)) {
        return true;
    }
    return false;
}

export default {
    components: {
        GuestHeader,
        SideBar,
    },
    setup() {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            isSubmitting: false,
            responseData: '',
            categories: {},
            brands: {},
            colors: {},
            sizes: {},
            previewImages: [],
            form: {
                name: '',
                category_id: '',
                brand_id: '',
                price: '',
                description: '',
                images: [],
                variation: [
                    {
                        color_id: '',
                        size_id: '',
                        name: '',
                        price: '',
                        stock_quantity: '',
                    }
                ]

            },
            valueFromHeader: false,
        }
    },
    methods: {
        openFileInput() {
            this.$refs.fileInput.click();
        },
        async getAllCategories() {
            try {
                const params = { type: 'product' };
                const response = await fetchData('get-all-parent-categories', params);
                 this.categories = response.data; 
            } catch (error) {
                console.log(error);
            }
        },
        async getAllBrands() {
            try {
                const response = await fetchData('get-all-brands');
                this.brands = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async getAllColors() {
            try {
                const response = await fetchData('get-all-colors');
                this.colors = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async getAllSizes() {
            try {
                const response = await fetchData('get-all-sizes');
                this.sizes = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        handleFileSelect(event) {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                this.form.images.push(file);
                this.previewImage(file);
            }
        },
        previewImage(file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.previewImages.push({ url: e.target.result, file });
            };
            reader.readAsDataURL(file);
        },
        removeImage(index) {
            this.form.images.splice(index, 1);
            this.previewImages.splice(index, 1);
        },
        addVariation() {
            this.form.variation.push({
                color_id: '',
                size_id: '',
                name: '',
                price: '',
                stock_quantity: '',
            })
        },
        removeVariation(index) {
            this.form.variation.splice(index, 1)
        },
        async addProduct() {
            if (this.v$.form.$invalid) {
                toast.error('Form is not valid', {
                    autoClose: 1000
                })
            } else {
                try {
                    this.isSubmitting = true;
                    const formData = new FormData();

                    for (const key in this.form) {
                        if (this.form.hasOwnProperty(key)) {
                            if (Array.isArray(this.form[key])) {
                                if (key === 'images') {
                                    for (let i = 0; i < this.form.images.length; i++) {
                                        formData.append(`images[${i}]`, this.form.images[i]);
                                    }
                                } else {
                                    formData.append(key, JSON.stringify(this.form[key]));
                                }
                            } else {
                                formData.append(key, this.form[key]);
                            }
                        }
                    }

                    const endpoint = '/add-product';
                    this.responseData = await postData(endpoint, formData);
                    toast.success(this.responseData.data.message, {
                        autoClose: 1000,
                    });
                    setTimeout(() => this.$router.push({ name: 'shop' }), 2000);
                } catch (error) {
                    console.log(error);
                }
            }
        },
        updateValueFromHeader(value) {
                // Update the value in the parent component
                this.valueFromHeader = value;
            },
    },
    mounted() {
        this.getAllCategories();
        this.getAllBrands();
        this.getAllColors();
        this.getAllSizes();
    },
    validations() {
        return {
            form: {
                name: {
                    required, name_validation: {
                        $validator: validName,
                        $message: 'Invalid Name. Valid name only contain letters, dashes (-) and spaces'
                    }
                },
                category_id: { required },
                brand_id: { required },
                price: { required, numeric },
                description: { required, min: minLength(10), max: maxLength(255) },
                images: { required },
                variation: {
                    $each: {
                        name: { required },
                        color_id: { required },
                        size_id: { required },
                        price: { required, numeric },
                        stock_quantity: { required, numeric },
                    }
                }
            }
        }
    }
}
</script>

<style scoped>
/* Add your styling here */
.image-preview {
    display: flex;
    flex-wrap: wrap;
    width: 50%;
}

.preview-item {
    position: relative;
    margin: 5px;
    flex: 0 0 calc(33.33% - 10px);
    box-sizing: border-box;
}

.image-preview-item {
    width: 60%;
    height: auto;
    max-height: 250px;
}

.remove-icon {
    position: absolute;
    top: 0;
    right: 80px;
    cursor: pointer;
    color: red;
    font-weight: bold;
}

.error-msg {
    color: red;
    font-size: 14px;
}
</style>