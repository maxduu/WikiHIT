# -*- coding: utf-8 -*-
"""
NETS 213 Final QC Aggregation.ipynb
"""

import pandas as pd

mturk_res = pd.read_csv('../output/sample_output.csv')

'''
QUALITY CONTROL Module:
    
Our conditions:
Out of a worker's completed HITs,
>= 75% of "Answer.wordGold" is 1
AND >= 75% "Answer.wordNegative" is 0  
'''
def quality_control(mturk_res):
    # Map workers to total number of HITs done
    worker_to_total = {}
    
    # Map workers to total number of HITs done that satify our conditions
    worker_to_positive = {}
    worker_to_negative = {}
    
    qualified = set()
    
    for index, row in mturk_res.iterrows():
        worker = row['WorkerId']
        
        if worker in worker_to_total:
            worker_to_total[worker] += 1
        else:
            worker_to_total[worker] = 1
            worker_to_positive[worker] = 0
            worker_to_negative[worker] = 0
        
        # Check if gold quality control is correct
        if row["Answer.wordGold"] == 1:
            worker_to_positive[worker] += 1
        
        # Check if negative quality control is correct
        if row["Answer.wordNegative"] != 0:
            worker_to_negative[worker] += 1
        

    # List to store tuples for qualified workers
    for worker in worker_to_total:
        total_hits = worker_to_total[worker]
        positive_hits = worker_to_positive[worker]
        negative_hits = worker_to_negative[worker]
        positive_prop = positive_hits / total_hits
        negative_prop = negative_hits / total_hits
        # Check both conditions
        if positive_prop >= .75 and negative_prop >= .75:
            qualified.add(worker)
    
    # Return set of qualified workers
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
                goal = row['Input.retrieved_goal_' + str(i)]
                stepgoal = step + "::" + goal
                
                if stepgoal not in stepgoal_to_votes:
                    stepgoal_to_votes[stepgoal] = [0, 0, 0, 0, 0]
                
                ans = row['Answer.word' + str(i)]
                if valid_num(ans):
                    stepgoal_to_votes[stepgoal][ans] += 1

    tuples = []
    for stepgoal, votes in stepgoal_to_votes.items():
        final_ans = votes.index(max(votes))
        split = stepgoal.split("::")
        step = split[0]
        goal = split[1]
        tuples.append((step, goal, final_ans))

    return sorted(tuples, key=lambda item: (item[0], item[1]))

qualified_workers = quality_control(mturk_res)
output = aggregation(mturk_res, qualified_workers)
agg = pd.DataFrame(output, columns=['step', 'retrieved_goal', 'answer'])
agg.to_csv("../output/sample_qc_aggregation_output.csv", index=False)