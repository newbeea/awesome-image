import type { Ref } from 'vue-demi';
export declare function useLazy(imageRef: Ref<any>, offset: Ref<string>): {
    loaded: Ref<boolean>;
    image: Ref<HTMLImageElement | undefined>;
};
