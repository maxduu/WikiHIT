
import json
import csv
import random

randomize_goals = True

json_file = 'para_step_goal_links_gold'
filename = json_file + '.json'

with open(filename) as f:
  data = json.load(f)

rows = []

c = 0
for goal, entry in data.items():
    l = []
    l.append(goal)
    l.append(entry['corresponding_goal'])
    l.append(entry['gold_goal'])
    retrieved_goals_list = entry['retrieved_goals']
    retrieved_goals_similarity_list = entry['retrieved_goals_similarity']
    
    if (randomize_goals):
        zipped = list(zip(retrieved_goals_list, retrieved_goals_similarity_list))
        random.shuffle(zipped)
        retrieved_goals_list, retrieved_goals_similarity_list = zip(*zipped)
    
    for i in range(len(retrieved_goals_list)):
        l.append(retrieved_goals_list[i])
    for i in range(len(retrieved_goals_list)):
        l.append(retrieved_goals_similarity_list[i])
    
    l.append(entry['retrieved_goal_rank'])
    
    rows.append(l)
    


filename_out = json_file
if randomize_goals:
    filename_out += '_random.csv'
else:
    filename_out += '_identical.csv'

with open(filename_out, 'w', newline='', encoding='utf-8') as out:
    csv_out=csv.writer(out)
    csv_out.writerow(['goal',
                      'corresponding_goal',
                      'gold_goal',
                      'retrieved_goal_1', 'retrieved_goal_2',
                      'retrieved_goal_3', 'retrieved_goal_4',
                      'retrieved_goal_5', 'retrieved_goal_6',
                      'retrieved_goal_7', 'retrieved_goal_8',
                      'retrieved_goal_9', 'retrieved_goal_10',
                      'retrieved_goal_similarity_1', 'retrieved_goal_similarity_2',
                      'retrieved_goal_similarity_3', 'retrieved_goal_similarity_4',
                      'retrieved_goal_similarity_5', 'retrieved_goal_similarity_6',
                      'retrieved_goal_similarity_7', 'retrieved_goal_similarity_8',
                      'retrieved_goal_similarity_9', 'retrieved_goal_similarity_10',
                      'retrieved_goal_rank'
                      ])
    csv_out.writerows(rows)
        
