// class Cube{
//     // constructor
//     constructor(){
//         this.type='cube'; // doesn't do anything - just helps us debug
//         // this.position = [0.0, 0.0, 0.0, 0.0];
//         this.color = [1.0, 1.0, 1.0, 1.0];
//         // this.size = 5.0;
//         // this.segments = 10;
//         this.matrix = new Matrix4();
//     }

//     // render this shape
//     render() {
//         // var xy = this.position;
//         var rgba = this.color;
//         // var size = this.size;

//         // Pass the color of a point to u_FragColor variable
//         gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

//         // pass the matrix to u_ModelMatrix attribute
//         gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

//         // // front of cube
//         // drawTriangle3D([0.0, 0.0, 0.0,  1.0, 1.0, 0.0,  1.0, 0.0, 0.0]);
//         // drawTriangle3D([0.0, 0.0, 0.0,  0.0, 1.0, 0.0,  1.0, 1.0, 0.0]);

//         // // top of cube
//         // drawTriangle3D([0.0, 1.0, 0.0,  0.0, 1.0, 1.0,  1.0, 1.0, 1.0]);
//         // drawTriangle3D([0.0, 1.0, 0.0,  1.0, 1.0, 1.0,  1.0, 1.0, 0.0]);

//         // other sides of the cube: top, bottom, left, right, back
        
//         // Front face (z=0)
//         drawTriangle3D([0,0,0, 1,1,0, 1,0,0]);
//         drawTriangle3D([0,0,0, 0,1,0, 1,1,0]);

//         // Back face (z=-1)
//         drawTriangle3D([0,0,-1, 1,0,-1, 1,1,-1]);
//         drawTriangle3D([0,0,-1, 1,1,-1, 0,1,-1]);
        
//         // pass the color of a point to u_FragColor uniform variable - make the next cube a slightly different color
//         gl.uniform4f(u_FragColor, rgba[0]*0.9, rgba[1]*0.9, rgba[2]*0.9, rgba[3])

//         // Top face (y=1)
//         // drawTriangle3D([0,1,0, 0,1,-1, 1,1,-1]);
//         // drawTriangle3D([0,1,0, 1,1,-1, 1,1, 0]);

//         // Bottom face (y=0)
//         drawTriangle3D([0,0,0, 1,0,-1, 0,0,-1]);
//         drawTriangle3D([0,0,0, 1,0, 0, 1,0,-1]);

//         // Right face (x=1)
//         drawTriangle3D([1,0,0, 1,1,-1, 1,0,-1]);
//         drawTriangle3D([1,0,0, 1,1, 0, 1,1,-1]);

//         // Left face (x=0)
//         drawTriangle3D([0,0,0, 0,0,-1, 0,1,-1]);
//         drawTriangle3D([0,0,0, 0,1,-1, 0,1, 0]);


//         // wall thickness
//         const t = 0.05; // adjust this value to change thickness

//         // inner front face
//         drawTriangle3D([t,t,0-t, 1-t,1,0-t, 1-t,t,0-t]);
//         drawTriangle3D([t,t,0-t, t,1,0-t, 1-t,1,0-t]);

//         // inner back face
//         drawTriangle3D([t,t,-1+t*5, 1-t,t,-1+t*5, 1-t,1,-1+t*5]);
//         drawTriangle3D([t,t,-1+t*5, 1-t,1,-1+t*5, t,1,-1+t*5]);

//         // inner right face
//         drawTriangle3D([1-t,t,0, 1-t,1,-1+t, 1-t,t,-1+t]);
//         drawTriangle3D([1-t,t,0, 1-t,1,0, 1-t,1,-1+t]);

//         // inner left face
//         drawTriangle3D([t,t,0, t,t,-1+t, t,1,-1+t]);
//         drawTriangle3D([t,t,0, t,1,-1+t, t,1,0]);

//         // inner bottom face
//         drawTriangle3D([t,t,0, 1-t,t,-1+t, t,t,-1+t]);
//         drawTriangle3D([t,t,0, 1-t,t,0, 1-t,t,-1+t]);

//         // top rim - front
//         drawTriangle3D([0,1,0, 1,1,0, 1-t,1,0]);
//         drawTriangle3D([0,1,0, 1-t,1,0, t,1,0]);

//         // top rim - back
//         drawTriangle3D([0,1,-1, 1-t,1,-1+t, 1,1,-1]);
//         drawTriangle3D([0,1,-1, t,1,-1+t, 1-t,1,-1+t]);

//         // top rim - right
//         drawTriangle3D([1-t,1,0, 1,1,-1, 1-t,1,-1+t]);
//         drawTriangle3D([1-t,1,0, 1,1,0, 1,1,-1]);

//         // top rim - left
//         drawTriangle3D([0,1,0, t,1,-1+t, 0,1,-1]);
//         drawTriangle3D([0,1,0, t,1,0, t,1,-1+t]);
//     }
// }


class Cube{
    constructor(){
        this.type='cube';
        this.color = [1.0, 1.0, 1.0, 1.0];
        this.matrix = new Matrix4();
    }

    render() {
        var rgba = this.color;

        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        const t = 0.1;

        // Front face
        drawTriangle3DWithNormal([0,0,0, 1,1,0, 1,0,0], [0,0,1]);
        drawTriangle3DWithNormal([0,0,0, 0,1,0, 1,1,0], [0,0,1]);

        // Back face
        drawTriangle3DWithNormal([0,0,-1, 1,0,-1, 1,1,-1], [0,0,-1]);
        drawTriangle3DWithNormal([0,0,-1, 1,1,-1, 0,1,-1], [0,0,-1]);

        // Bottom face
        drawTriangle3DWithNormal([0,0,0, 1,0,-1, 0,0,-1], [0,-1,0]);
        drawTriangle3DWithNormal([0,0,0, 1,0, 0, 1,0,-1], [0,-1,0]);

        // Right face
        drawTriangle3DWithNormal([1,0,0, 1,1,-1, 1,0,-1], [1,0,0]);
        drawTriangle3DWithNormal([1,0,0, 1,1, 0, 1,1,-1], [1,0,0]);

        // Left face
        drawTriangle3DWithNormal([0,0,0, 0,0,-1, 0,1,-1], [-1,0,0]);
        drawTriangle3DWithNormal([0,0,0, 0,1,-1, 0,1, 0], [-1,0,0]);

        // inner front face
        drawTriangle3DWithNormal([t,t,-t, 1-t,1,-t, 1-t,t,-t], [0,0,-1]);
        drawTriangle3DWithNormal([t,t,-t, t,1,-t, 1-t,1,-t], [0,0,-1]);

        // inner back face
        drawTriangle3DWithNormal([t,t,-1+t, 1-t,t,-1+t, 1-t,1,-1+t], [0,0,1]);
        drawTriangle3DWithNormal([t,t,-1+t, 1-t,1,-1+t, t,1,-1+t], [0,0,1]);

        // inner right face
        drawTriangle3DWithNormal([1-t,t,-t, 1-t,1,-1+t, 1-t,t,-1+t], [-1,0,0]);
        drawTriangle3DWithNormal([1-t,t,-t, 1-t,1,-t, 1-t,1,-1+t], [-1,0,0]);

        // inner left face
        drawTriangle3DWithNormal([t,t,-t, t,t,-1+t, t,1,-1+t], [1,0,0]);
        drawTriangle3DWithNormal([t,t,-t, t,1,-1+t, t,1,-t], [1,0,0]);

        // inner bottom face
        drawTriangle3DWithNormal([t,t,-t, 1-t,t,-1+t, t,t,-1+t], [0,1,0]);
        drawTriangle3DWithNormal([t,t,-t, 1-t,t,-t, 1-t,t,-1+t], [0,1,0]);

        // top rim - front
        drawTriangle3DWithNormal([0,1,0, t,1,-t, t,1,0], [0,1,0]);
        drawTriangle3DWithNormal([0,1,0, 1,1,0, 1-t,1,-t], [0,1,0]);
        drawTriangle3DWithNormal([0,1,0, 1-t,1,-t, t,1,-t], [0,1,0]);
        drawTriangle3DWithNormal([1,1,0, 1,1,-t, 1-t,1,-t], [0,1,0]);

        // top rim - back
        drawTriangle3DWithNormal([0,1,-1, 1,1,-1, 1-t,1,-1+t], [0,1,0]);
        drawTriangle3DWithNormal([0,1,-1, 1-t,1,-1+t, t,1,-1+t], [0,1,0]);
        drawTriangle3DWithNormal([0,1,-1, t,1,-1+t, 0,1,-1+t], [0,1,0]);
        drawTriangle3DWithNormal([1,1,-1, 1,1,-1+t, 1-t,1,-1+t], [0,1,0]);

        // top rim - right
        drawTriangle3DWithNormal([1-t,1,-t, 1,1,-1+t, 1-t,1,-1+t], [0,1,0]);
        drawTriangle3DWithNormal([1-t,1,-t, 1,1,-t, 1,1,-1+t], [0,1,0]);

        // top rim - left
        drawTriangle3DWithNormal([0,1,-t, t,1,-1+t, 0,1,-1+t], [0,1,0]);
        drawTriangle3DWithNormal([0,1,-t, t,1,-t, t,1,-1+t], [0,1,0]);
        
        // top rim - left left corner - (thinks it's the front left corner!)
        drawTriangle3DWithNormal([0,1,-t, t,1,-t, 0,1,0], [0,1,0]);
        drawTriangle3DWithNormal([0,1,-t, t,1,0, t,1,-t], [0,1,0]);
    }
}