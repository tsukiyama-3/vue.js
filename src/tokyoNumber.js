export const tokyoNumber = {
    data() {
        return {
            title: "Welcome to Tokyo",
            subTitle: "Hello World!",
            number: 0
        };
    },
    filters: {
        lowerCase(value) {
            return value.toLowerCase();
        }
    },
}