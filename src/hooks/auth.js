import { computed } from "vue";
import { useStore } from "vuex";

export default function useCheckAuth() {
    const store = useStore();
    return computed(() => {
        return (
            store.getters["auth/isAuthenticated"] ||
            localStorage.getItem("isAuthenticated") === "true"
        );
    });
}