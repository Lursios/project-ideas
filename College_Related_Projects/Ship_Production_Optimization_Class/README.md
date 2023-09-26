# What the Class Is About 
The Class Starts Off with the indtroduction to Ship Production starting from the initial design phase until delivery stage.
at the end of the term we where asked to create and present a method that can solve a problem in the industry and provide the solution for it. ( We need to find our own problem and create our own solution ) for our final grade and this program is what i created for that class.

## The Problem 

When Naval Architects & Engineers constuct a ship the approach that is commonly used is the block consturction method, which is a method that divide the the ship into block sections ( the number of block depends on the size of the ship) and each yard will work creating the block which is then combine or the correct term is erected into one whole ship when all the block sections are finished constructed. you can see from the picture below on how each section distributed.

![ship-breakdown-structure](https://github.com/Lursios/projects/blob/main/College_Related_Projects/Ship_Production_Optimization_Class/Assets/Units-and-blocks-of-ships-hull-in-an-exploded-view.png)

Based on the picture above we can see there's a lot of work to be done and you can imagine how difficult it is to distributed the work correctly on a timely manner while avoiding any bottlenecks during the production phase and the larger the ship the more complex and whole lot more works need to be done and distributed.

The program created is planned to help optimize the distribution of the work by effectively scheduling the work on each machines so that when during the production it will schedule what work needs to be done on what machine that will give the most optimal minimum time required to produce an assembly of the block.But On this program it focuses more on the approach for producing the block plane. Which the flow can be seen below. 

![block-plane-flowline](https://github.com/Lursios/projects/blob/main/College_Related_Projects/Ship_Production_Optimization_Class/Assets/Plane%20Block%20Flow%20Diagram.png)

## Algorithm & Objective Function

The algorithm that was used to get the optimal value is a heuristic swarm based algorithm called the Particles Swarm Optimization (PSO).
It's an algorithm that works based on how a flock birds interact with it groups where the best solution is considered by the group behaviour which is represented by the Social Learning Factor and by the individual bird learning factor and the intertia weight which represent how the flocks and the individual birds particles moves towards the optimal solution. Which if represented in a mathematical formulation can be seen below.
  
<p float="center">
  <img src="https://github.com/Lursios/projects/blob/main/College_Related_Projects/Ship_Production_Optimization_Class/Assets/PSO-Update%20Function.png" width="50%" />
</p>

The function fit into the algorithm by moving the current position of the solution to a another position and checking if the value is much more optimal than the previous one. The Flow of PSO can be seen below.

![PSO-Flow](https://github.com/Lursios/projects/blob/main/College_Related_Projects/Ship_Production_Optimization_Class/Assets/PSO%20Flow%20Chart.png)


Since each of these behavioural variable needs to be predefined, we set the value based on a research done on the PSO by
[Manal Abdulkareem Zeidan (2021) "Improved particle swarm algorithm For permutation flow shop Scheduling problems."](https://rev-inv-ope.pantheonsorbonne.fr/sites/default/files/inline-files/42221-05.pdf) as follows. 

<ul>
  <li>Inertial Weight = 0.5</li> 
  <li>Congnitive Learning Factor = 0.3</li> 
  <li>Social Learning Factor = 0.3</li> 
</ul>

The Fitness Function has the same meaning as Objective Function but the term "Fitness" is oftenly used for heuristic algorithm since it's easier to remember by saying we measure how "fit" our solution with this function. for our problem the fitness calculate the current schedule ( which is the solution ) created time. 

![fitness-function formula](https://github.com/Lursios/projects/assets/88123655/7ecae77c-bbdf-4cce-a913-28b58a88b581)
![image](https://github.com/Lursios/projects/assets/88123655/3e120294-6a34-449b-95ce-6d7afb38c6b0)

But since the result of the solution is a schedule which the value is a real number (can be seen below ) and the result of the PSO is a location based which value is represented in integers to make it possible and turn it into a real number we use the ROV Encoding Method as can be seen below.

![image](https://github.com/Lursios/projects/assets/88123655/1262ffb9-b3a2-4d15-9ab9-03a13ef4ff4f)
![image](https://github.com/Lursios/projects/assets/88123655/1aeb580a-5ec5-410a-8998-e0f2ff91d0a9)

The ROV Method will rank the location value and from the rank it will return the order of work that needs to be done hence solving our int real number representation problem.

P.S : For creating this project and solution i relied heavily on the paper [Hui Guo (2020) "Green scheduling optimization of ship plane block flow line considering
carbon emission and noise" Computers & Industrial Engineering.](https://www.researchgate.net/publication/343220155_Green_scheduling_optimization_of_ship_plane_block_flow_line_considering_carbon_emission_and_noise) in case you're interested in looking at the original source.

The python code can be found in the relative folder here.

















