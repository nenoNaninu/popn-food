# Pop'n Food

Pop'n Food is a web application for visualizing 3D models generated from large numbers of images in a browser. This application was created to streamline my research.

[Full demo video](https://youtu.be/YyIu8bL65EE)

![popn_food_output](https://user-images.githubusercontent.com/27144255/171664740-0530fa47-cb44-4785-8b99-c9d9a118d0dc.gif)


## Background

I was researching a method to generate two 3D models from a single image.
The paper can be found at the following link.

[Hungry Networks](https://dl.acm.org/doi/10.1145/3444685.3446275)

It is necessary to evaluate what 3D shapes are reconstructed qualitatively in such research.
However, checking a large number of 3D models reconstructed from a large number of images is tedious and requires many steps.

This application frees us from many painful steps and allows us to comfortably see what 3D model was generated from which image.
This application has two modes.

- A mode to visualize a pre-generated 3D model.
- A mode to generate and visualize a 3D model in real time from the input image.
    - This repository does not contain a backend server for generating 3D models from a single image.

## Usage

First, install dependencies.

```bash
yarn install
```

Run a development server.

```bash
yarn dev
```

Publish static files.

```
yarn build
yarn export
```

## Paper Info

[**Hungry Networks**](https://dl.acm.org/doi/10.1145/3444685.3446275)

```
@inproceedings{Naritomi2020hungry,
    Author={Naritomi, S. and Yanai, K.},
    title={{Hungry Networks}: {3D} Mesh Reconstruction of a Dish and a Plate from a Single Dish Image for Estimating Food Volume},
    booktitle={Proc. of ACM Multimedia Asia},
    year={2020}
}
```

[**Pop'n Food**](https://ieeexplore.ieee.org/document/9565558)

```
@inproceedings{Naritomi2021popn,
  author={Naritomi, S. and Yanai, K.},
  booktitle={Proc. of IEEE Conference on Multimedia Information Processing and Retrieval (MIPR)}, 
  title={{Pop'n Food}: 3D Food Model Estimation System from a Single Image}, 
  year={2021},
}
```
