export default {
    data() {
        return {

        }
    },

    methods: {
        // This method is used to send requests to the backend. Same as axios.get ot axios.post. Here, it is accessible globally.
        async callApi(method, url, dataObj) {
            try {
                return await axios({
                    method: method,
                    url: url,
                    data: dataObj
                });
            } catch (e) {
                return e.response
            }
        },

        // Methods for iviewUI that produces notification pop-ups. Used here to make it global everywhere.
        infoN(description, title = "Info") {
            this.$Notice.info({
                title: title,
                desc: description,
            });
        },
        successN(description, title = "Success") {
            this.$Notice.success({
                title: title,
                desc: description,
            });
        },
        warningN(description, title = "Warning") {
            this.$Notice.warning({
                title: title,
                desc: description,
            });
        },
        errorN(description, title = "Error") {
            this.$Notice.error({
                title: title,
                desc: description,
            });
        },
        swrN(description = "Something Went Wrong !! Please try again...", title = "Error") {
            this.$Notice.error({
                title: title,
                desc: description,
            });
        },
    },
}