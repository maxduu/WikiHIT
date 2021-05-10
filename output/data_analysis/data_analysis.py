
import pandas as pd


# Results CSV file
results = pd.read_csv('../qc_aggregation/combined_qc_aggregation_output.csv')



#
# Overall performance across all step/goal pairs
#

def get_overall_accuracy(results):
    total = 0
    answers = [0, 0, 0, 0, 0]
    
    for index, row in results.iterrows():
        total += 1
        answers[row['answer']] += 1
        
    answers = [a / total for a in answers]
    
    print("Overall accuracy:")
    print("*Note that the first index is answer 5. That is, the array corresponds to answers [5, 1, 2, 3, 4]")
    print(answers)

#
# Performance across all step/goal pairs within each WikiHow category
#

def get_accuracy_by_category(results):
    
    category_to_total = {}
    category_to_answers = {}
    
    for index, row in results.iterrows():
        category = row['category']
        
        if category not in category_to_total:
           category_to_total[category] = 0
           category_to_answers[category] = [0, 0, 0, 0, 0]
        
        answer = row['answer']
        category_to_total[category] += 1
        category_to_answers[category][answer] += 1
    
    tuples = []
    for category, answers in category_to_answers.items():
        answers = [a / category_to_total[category] for a in answers]
        tuples.append((category, answers[1], answers[2], answers[3], answers[4], answers[0]))
    
    tuples = sorted(tuples, key=lambda item: (item[0]))
    
    df = pd.DataFrame(tuples, columns=['', '1', '2', '3', '4', '5'])
    df.to_csv("accuracy_by_category.csv", index=False)


#
# Performance across all step/goal pairs within different ranges of retrieved_goal_similarity
#

# Helper function to get the range a retrieved_goal_similarity falls in
def get_range_label(s):
    '''
    Ranges for retrieved similarity (s):
    1. 0 <= s < 0.4
    2. 0.4 <= s < 0.5
    3. 0.5 <= s < 0.6
    4. 0.6 <= s < 0.7
    5. 0.7 <= s < 0.8
    6. 0.8 <= s < 0.9
    7. 0.9 <= s <= 1
    '''
    if s < 0.4:
        return "0 - 0.4"
    elif s < 0.5:
        return "0.4 - 0.5"
    elif s < 0.6:
        return "0.5 - 0.6"
    elif s < 0.7:
        return "0.6 - 0.7"
    elif s < 0.8:
        return "0.7 - 0.8"
    elif s < 0.9:
        return "0.8 - 0.9"
    else:
        return "0.9 - 1.0"
    

def get_accuracy_by_similarity(results):
    range_to_total = {}
    range_to_answers = {}
    
    for index, row in results.iterrows():
        s = row['retrieved_goal_similarity']
        range_label = get_range_label(s)
        
        if range_label not in range_to_total:
           range_to_total[range_label] = 0
           range_to_answers[range_label] = [0, 0, 0, 0, 0]
        
        answer = row['answer']
        range_to_total[range_label] += 1
        range_to_answers[range_label][answer] += 1
    
    tuples = []
    for range_label, answers in range_to_answers.items():
        answers = [a / range_to_total[range_label] for a in answers]
        tuples.append((range_label, answers[1], answers[2], answers[3], answers[4], answers[0]))
    
    tuples = sorted(tuples, key=lambda item: (item[0]))
    
    df = pd.DataFrame(tuples, columns=['', '1', '2', '3', '4', '5'])
    df.to_csv("accuracy_by_similarity.csv", index=False)




#
# Performance across edit distance between step and retrieved_goal
#
# Uses Levenshtein distance, which measures minimum number 
# of single-character edits to transform one string into another
#
# Helps analyze how the model performs for retrieving goals that 
# are not purely similar in words to the step
#

# Helper method that performs the Levenshtein distance
def levenshteinDistance(s1, s2):
    if len(s1) > len(s2):
        s1, s2 = s2, s1

    distances = range(len(s1) + 1)
    for i2, c2 in enumerate(s2):
        distances_ = [i2 + 1]
        for i1, c1 in enumerate(s1):
            if c1 == c2:
                distances_.append(distances[i1])
            else:
                distances_.append(1 + min((distances[i1], distances[i1 + 1], distances_[-1])))
        distances = distances_
    return distances[-1]


# Helper function to get the range a retrieved_goal_similarity falls in
def get_distance_label(d):
    if d < 5:
        return "1. 0 - 4"
    elif d < 10:
        return "2. 5 - 9"
    elif d < 15:
        return "3. 10 - 14"
    elif d < 20:
        return "4. 15 - 19"
    elif d < 25:
        return "5. 20 - 24"
    elif d < 30:
        return "6. 25 - 29"
    elif d < 35:
        return "7. 30 - 34"
    elif d < 40:
        return "8. 35 - 39"
    else:
        return "9. 40+"

# Get average edit_distance
def get_average_edit_distance_by_answer(results):
    answer_counts = [0, 0, 0, 0, 0]
    answer_distances = [0, 0, 0, 0, 0]
    
    max_distance = 0
    
    for index, row in results.iterrows():
        step = row['step']
        retrieved_goal = row['retrieved_goal']
        answer = row['answer']
        answer_counts[answer] += 1
        edit_distance = levenshteinDistance(step, retrieved_goal)
        answer_distances[answer] += edit_distance
        if edit_distance > max_distance:
            max_distance = edit_distance
        
    answer_avg_distances = [answer_distances[i] / answer_counts[i] for i in range(len(answer_counts))]
    
    print("Average edit distance by answer")
    print("*Note that the first index is answer 5. That is, the array corresponds to answers [5, 1, 2, 3, 4]")
    print(answer_avg_distances)
    
    
def get_accuracy_by_edit_distance(results):
    range_to_total = {}
    range_to_answers = {}
    
    for index, row in results.iterrows():
        step = row['step']
        retrieved_goal = row['retrieved_goal']
        edit_distance = levenshteinDistance(step, retrieved_goal)
        range_label = get_distance_label(edit_distance)
        
        if range_label not in range_to_total:
           range_to_total[range_label] = 0
           range_to_answers[range_label] = [0, 0, 0, 0, 0]
        
        answer = row['answer']
        range_to_total[range_label] += 1
        range_to_answers[range_label][answer] += 1
    
    tuples = []
    for range_label, answers in range_to_answers.items():
        answers = [a / range_to_total[range_label] for a in answers]
        tuples.append((range_label, answers[1], answers[2], answers[3], answers[4], answers[0]))
        
    tuples = sorted(tuples, key=lambda item: (item[0]))
    
    df = pd.DataFrame(tuples, columns=['', '1', '2', '3', '4', '5'])
    df.to_csv("accuracy_by_edit_distance.csv", index=False)



### Perform data analysis functions

get_overall_accuracy(results)
get_accuracy_by_category(results)
get_accuracy_by_similarity(results)
get_average_edit_distance_by_answer(results)
get_accuracy_by_edit_distance(results)



