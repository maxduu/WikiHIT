# WikiHIT
NETS213 Final Project

## How to Contribute
1. You can find the link to our HIT here: https://workersandbox.mturk.com/projects/3BQ1D491DHVVEJ0UZDP7OBWL7DXRTJ/tasks?ref=w_pl_prvw 
2. Here are instructions on how to complete our HIT: https://vimeo.com/542454316
3. Each HIT has a step as a prompt. In the given articles, indicate using the dropdowns whether the WikiHow article exactly explains how to do the step, explains something close enough but it's too general, explains something close enough but it's too specific, explains something related but you don't think you can do the step with the instructions, or is unrelated to the step. If available, a preview will be given of the article in italics.

If you encounter issues or have any questions, please contact jenyen@seas.upenn.edu or any of the contributors to this repository.

------ 
→ (1) Collect Harry’s (Li Zhang) model data 

  → (1a) User interface website for users to test out and obtain outputs from the model (4 pt)
  
  → (1b) Build/deploy/manage AMT HITs asking if a step is relevant to a given article (2.5 pt) 
  
  → (1c) Implement quality control (quality control module, gold-standard: 1 layer down on tree w/ BFS,     direct hyperlinks on the WikiHow page) (2pt)
      
→ (2) Collect accuracy data (aggregation module) (2pt)

   → (2a) Data visualization (on how model is accurate across categories, how deep down the tree each          node/article is, word similarity vs accuracy) (3.5pt)
    
   → (2b) Loop back to possibly variants of AMT HITs to collect more data as necessary, continuously study how the model can be improved (3pt)
   
   → (2c) show Harry, possibly ask for more data given what we find (1pt)

------ 
## Code
Quality Control:

The quality control module is implemented in the `quality_control` function of the `src/qc_aggregation.py`. First, note that each HIT contains two gold standard "goals" for a given step: one goal is positive and clearly should be answered "Exact match," while the other goal is negative and clearly should be answered "Unrelated." For each worker in the MTurk results CSV, the `quality_control` function only adds the worker's ID to a set of qualified workers if (1) over 75% of the positive goals are correctly answered and (2) over 75% of the negative goals are correctly answered. The function then outputs the set of qualified workers for usage in the aggregation module.


Aggregation:

After the quality control module outputs the set of qualified workers, the aggregation module works as a simple majority vote to obtain the final outputs. For each "step" and its corresponding "retrieved goal," the `aggregation` function in `src/qc_aggregation.py` counts the vote for each of the 5 possible answers. Note that it only counts votes by workers in the set of qualified workers, which is passed in as an argument to the function. After iterating through the entire batch, it finds the answer with the highest vote for each step/goal pair. It then outputs tuples in the form of (step, goal, answer), which are sorted alphabetically by "step" and then "goal." This sorting ensures that in the output CSV, each goal is grouped with the other goals that correspond to the same step.

------
Raw Data: https://github.com/maxduu/WikiHIT/blob/main/data/para_step_goal_links_gold_random.csv
Code to obtain CSV Data: https://github.com/maxduu/WikiHIT/blob/main/data/para_step_goal_links_gold_random.csv
Sample HIT Output: https://github.com/maxduu/WikiHIT/blob/main/output/sample_output.csv
Sample Output QC & Aggregation: https://github.com/maxduu/WikiHIT/blob/main/output/sample_qc_aggregation_output.csv
Code for QC & Aggregation: https://github.com/maxduu/WikiHIT/blob/main/src/qc_aggregation.py
