<template>
    <div>
        <div v-if="editMode" style="margin-top:-20px;">
            <v-text-field 
                    :label="label" 
                    v-bind="value"
                    @change="change"
            />
        </div>
        <div v-else>
            {{label}} :  {{value}}
        </div>
    </div>
</template>

<script>  
    export default {
        name: 'String',
        components:{
        },
        props: {
            value:{
                type: String,
                default: ''
            },
            editMode: Boolean,
            label: String
        },
        methods:{
            change(){
                this.$emit("input", this.value);
            }
        }
    }
</script>
