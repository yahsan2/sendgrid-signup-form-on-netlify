<template>
  <form
    method="post"
    action="/.netlify/functions/sendgrid"
    @submit.prevent="onSubmit"
  >
    <input type="email" v-model="email" />
    <input type="submit" />
  </form>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      email: "",
    };
  },
  methods: {
    async onSubmit({ target }) {
      const response = await fetch(target.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
        }),
      });
    },
  },
};
</script>
