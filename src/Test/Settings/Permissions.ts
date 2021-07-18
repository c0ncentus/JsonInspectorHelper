
export const permission = {
    BasicCrud: {
        autoFillDangerous: false,
        NEW: true,
        ONLY_READ: false,
        UPDATE_EXIST: { keys: true, value: true },
        UPDATE_NEW: { keys: true, value: true }
    },
    BasicRead: {
        autoFillDangerous: false,
        NEW: false,
        ONLY_READ: true,
        UPDATE_EXIST: { keys: false, value: false },
        UPDATE_NEW: { keys: false, value: false },
    },
    readOnlyExist: {
        autoFillDangerous: false,
        NEW: true,
        ONLY_READ: false,
        UPDATE_EXIST: { keys: false, value: false },
        UPDATE_NEW: { keys: true, value: true },
    },
}