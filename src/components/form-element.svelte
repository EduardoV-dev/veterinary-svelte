<script lang="ts">
    import type { HTMLInputTypeAttribute } from "svelte/elements";

    /** defines the label of the element */
    export let label: string;
    /** defines the input type */
    export let type: HTMLInputTypeAttribute | "textarea";
    /** id of the input */
    export let id: string;
    /** Input's placeholder */
    export let placeholder: string;
    /** Input's value */
    export let value: string;
</script>

<div class="form-element">
    <label class="form-element__label" for={id}>{label}</label>

    {#if type === "textarea"}
        <textarea
            {...{ id, placeholder }}
            bind:value
            class="form-element__textarea"
        />
    {:else}
        <input
            {...{ type, id, placeholder }}
            bind:value
            class="form-element__input"
        />
    {/if}
</div>

<style lang="scss">
    .form-input {
        background-color: #111;
        border-radius: 10px;
        color: #fff;
        padding: 0.5rem 1rem;
    }

    .form-element {
        display: grid;
        gap: 0.5rem;

        :is(&__input, &__textarea) {
            @extend .form-input;
        }

        &__textarea {
            @extend .form-input;
            min-height: 150px;
        }
    }
</style>
