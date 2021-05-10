# -*- coding: utf-8 -*-
"""
NETS 213 Final QC Aggregation.ipynb
"""

import pandas as pd
import pickle
import math

mturk_res = pd.read_csv('../mturk_results/combined_results_mturk.csv')

with open('../../data/goal_to_category.pkl', 'rb') as f:
    goal_to_category = pickle.load(f)

'''
QUALITY CONTROL Module:
    
Our conditions:
Out of a worker's completed HITs,
>= 75% of "Answer.wordGold" is 1
AND >= 75% "Answer.wordNegative" is 0  
'''
def quality_control(mturk_res):
    
    total = 0
    total_negative = 0
    total_positive = 0
    
    # Map workers to total number of HITs done
    worker_to_total = {}
    
    # Map workers to total number of HITs done that satisfy our conditions
    worker_to_positive = {}
    worker_to_negative = {}
    
    qualified = set()
    
    for index, row in mturk_res.iterrows():
        total += 1
        worker = row['WorkerId']
        
        if worker in worker_to_total:
            worker_to_total[worker] += 1
        else:
            worker_to_total[worker] = 1
            worker_to_positive[worker] = 0
            worker_to_negative[worker] = 0
        
        # Check if positive quality control is correct
        if not math.isnan(row["Answer.chooseGold"]) and row["Answer.chooseGold"] != 0:
            total_positive += 1
            worker_to_positive[worker] += 1
        
        # Check if negative quality control is correct
        if not math.isnan(row["Answer.chooseNegative"]) and row["Answer.chooseNegative"] != 1:
            total_negative += 1
            worker_to_negative[worker] += 1
            
    # List to store tuples for qualified workers
    for worker in worker_to_total:
        total_hits = worker_to_total[worker]
        positive_hits = worker_to_positive[worker]
        negative_hits = worker_to_negative[worker]
        positive_prop = positive_hits / total_hits
        negative_prop = negative_hits / total_hits
        # Check both conditions
        if positive_prop >= .9 and negative_prop >= .9:
            qualified.add(worker)
    
    print(f"Total HITs: {total}") 
    # Return set of qualified workers
    print(f"Total workers: {len(worker_to_total)}")
    print(f"Number of qualified workers: {len(qualified)}")
    print(total_negative)
    #print(qualified)
    return qualified


# Helper method that ensures HIT only has 0, 1, 2, 3, or 4 for answer
def valid_num(num):
  return num >= 0 and num <= 4

'''
AGGREGATION Module:
    
Performs majority vote (among qualified workers ONLY) 
to obtain the most popular answer for a step/goal pair
'''
def aggregation(mturk_res, qualified_workers):
    
    stepgoal_to_votes = {}
    
    for index, row in mturk_res.iterrows():
        worker = row['WorkerId']
        if worker in qualified_workers:
            step = row['Input.step']
            for i in range(1, 11):
                
                retrieved_goal_similarity = row['Input.retrieved_goal_similarity_' + str(i)]
                corresponding_goal = row['Input.corresponding_goal']
                
                goal = row['Input.retrieved_goal_' + str(i)]
                stepgoal = step + "::" + goal + "::" + str(retrieved_goal_similarity) + "::" + corresponding_goal

                if stepgoal not in stepgoal_to_votes:
                    stepgoal_to_votes[stepgoal] = [0, 0, 0, 0, 0]
                
                if not math.isnan(row[f"Answer.choose{i}"]):
                    ans = int(row['Answer.choose' + str(i)])
                    if valid_num(ans):
                        stepgoal_to_votes[stepgoal][ans] += 1

    tuples = []
    for stepgoal, votes in stepgoal_to_votes.items():
        # Find most popular answer
        final_ans = votes.index(max(votes))
            
        split = stepgoal.split("::")
        step = split[0]
        goal = split[1]
        retrieved_goal_similarity = split[2]
        corresponding_goal = split[3]
        category = ""
        if corresponding_goal in goal_to_category:
            category = goal_to_category[corresponding_goal]
        tuples.append((category, corresponding_goal, step, goal, retrieved_goal_similarity, final_ans))
        
    # Return tuples first sorted by category
    return sorted(tuples, key=lambda item: (item[0], item[2], item[4]))

qualified_workers = quality_control(mturk_res)
output = aggregation(mturk_res, qualified_workers)
agg = pd.DataFrame(output, columns=['category', 'corresponding_goal', 'step', 'retrieved_goal', 'retrieved_goal_similarity', 'answer'])
agg.to_csv("combined_qc_aggregation_output.csv", index=False)