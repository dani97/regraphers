export const CREATE_WIRE_FRAME='CREATE_WIRE_FRAME';

export const createWireFrame = (wireFrame) => ({
    type: CREATE_WIRE_FRAME,
    payload: wireFrame
});
