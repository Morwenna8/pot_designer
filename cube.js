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