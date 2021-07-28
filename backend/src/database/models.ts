import 'dotenv/config';
import { Schema, model, ObjectId } from 'mongoose';

export interface IActivity {
  location: {
    lat: number;
    lng: number;
  };
  time?: Date;
  destination?: string;
  cost?: number;
  type?: string;
  comments: string[];
  suggested?: {
    destination: string;
    type: string;
    comments: string;
  }[];
}

export const activitySchema = new Schema<IActivity>({
  location: {
    type: {
      lat: Number,
      lng: Number,
    },
    required: true,
  },
  time: Date,
  destination: String,
  cost: Number,
  type: String,
  comments: [String],
  suggested: [new Schema({
    destination: String,
    type: String,
    comments: String,
  })],
}, { toObject: { versionKey: false } });

export interface IUser {
  name: string,
  email: string,
}

export interface IItinerary {
  user_id: ObjectId;
  name: string;
  start_date: Date;
  end_date: Date;
  destination: string;
  dest_coords: {
    type: {
      lat: Number,
      lng: Number,
    },
    required: true,
  };
  collaborators: {
    user_id: string;
    name: string;
    email: string;
  }[];
  budget?: number;
  dining_budget?: number;
  restaurant_ratings?: number;
  max_walking_dist?: number;
  max_driving_dist?: number;
  current_cost?: number;
  comments?: string;
  tags: string[];
  activities: IActivity[];
}

export const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
}, { toObject: { versionKey: false } });

export const itinerarySchema = new Schema<IItinerary>({
  user_id: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  destination: { type: String, required: true },
  dest_coords: {
    type: {
      lat: Number,
      lng: Number,
    },
    required: true,
  },
  budget: { type: Number, default: undefined },
  current_cost: { type: Number, default: 0 },
  dining_budget: { type: Number, default: 2 },
  restaurant_ratings: { type: Number, default: 3 },
  max_walking_dist: { type: Number, default: 5 },
  max_driving_dist: { type: Number, default: 15 },
  collaborators: [new Schema({
    user_id: Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true }
  })],
  comments: String,
  tags: [String],
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  activities: [activitySchema],
}, { toObject: { versionKey: false } });

itinerarySchema.index({ user_id: 1, name: 1 }, { unique: true });

itinerarySchema.pre('validate', function (next) {
  if (this.start_date > this.end_date) {
    next(new Error('End Date must be greater than Start Date'));
  } else {
    next();
  }
});

export const User = model<IUser>('User', userSchema);
export const Itinerary = model<IItinerary>('Itinerary', itinerarySchema);
export const Activity = model<IActivity>('Activity', activitySchema);
