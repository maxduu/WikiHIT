# WikiHIT
NETS213 Final Project

## How to Contribute
1. You can find the link to our HIT here: https://workersandbox.mturk.com/projects/3BQ1D491DHVVEJ0UZDP7OBWL7DXRTJ/tasks?ref=w_pl_prvw 
2. Here are instructions on how to complete our HIT: https://vimeo.com/542454316
3. Each HIT has a step as a prompt. In the given articles, indicate using the dropdowns whether the WikiHow article exactly explains how to do the step, explains something close enough but it's too general, explains something close enough but it's too specific, explains something related but you don't think you can do the step with the instructions, or is unrelated to the step. A preview will be given of the article in italics.

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
Raw Data: https://github.com/maxduu/WikiHIT/blob/main/data/para_step_goal_links_gold_random.csv
Sample Input:
Sample Output QC:
Sample Output Aggregation:
Code for QC:
Code for Aggregaiton:
