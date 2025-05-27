import { Schema, model } from 'mongoose';

const integrationEventSchema = new Schema({
    date: Date,
    logLevel: Number,
    payload: String
});

const integrationSchema = new Schema({
    events: [integrationEventSchema]
});

export const Integration = model('Integration', integrationSchema);