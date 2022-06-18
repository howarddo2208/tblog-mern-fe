import "@tensorflow/tfjs";
import * as toxicity from "@tensorflow-models/toxicity";
import { toast } from "react-toastify";

export const classifyToxicity = async (texts) => {
  const model = await toxicity.load();
  const predictions = await model.classify(texts);
  return predictions;
};

export const classifyToxicAndWarn = async (texts) => {
  const predictions = await classifyToxicity(texts);
  if (predictions[6].results[0].match) {
    toast("This post contains toxic content!");
  }
};
