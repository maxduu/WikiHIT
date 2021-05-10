from os.path import join, isfile, expanduser
from os import listdir
import pickle
import json

json_path = 'js_files_en/'
json_path = expanduser("js_files_en/")
json_file_list = [f for f in listdir(json_path) if isfile(join(json_path, f))]

goal_to_category = {}
goal_to_description = {}
goalstep_to_description = {}

counter = 0
for json_file in json_file_list:
  counter += 1
  if counter % 1000 == 0:
    print(counter)
  with open(join(json_path,json_file)) as fj:
    json_obj = json.load(fj)
  try:
    title = json_obj['title'][7:]
  except TypeError:
    continue
  # found a goal
  goal_to_description[title] = json_obj['title_description']
  if json_obj['category_hierarchy']:
      goal_to_category[title] = json_obj['category_hierarchy'][0]
  methods,parts = json_obj['methods'],json_obj['parts']
  steps = json_obj['steps'] if 'steps' in json_obj else []
  section = None
  if methods:
    section = 'methods'
  elif parts:
    section = 'parts'
  elif steps:
    section = 'steps'
  if section in ['methods','parts']:
    for section_obj in json_obj[section]:
      part_name = section_obj['name']
      steps = []
      for step_obj in section_obj['steps']:
        steps.append(step_obj['headline'])
        goalstep_to_description[title + ":" + step_obj['headline']] = step_obj['description']
        # found a step
  elif section == 'steps':
    steps = []
    for step_obj in json_obj[section]:
      steps.append(step_obj['headline'])
      goalstep_to_description[title + ":" + step_obj['headline']] = step_obj['description']
      # found a step
      
with open('goal_to_category.pkl', 'wb') as handle:
    pickle.dump(goal_to_category, handle)
      
with open('goal_to_description.pkl', 'wb') as handle:
    pickle.dump(goal_to_description, handle)
    
with open('goalstep_to_description.pkl', 'wb') as handle:
    pickle.dump(goalstep_to_description, handle)