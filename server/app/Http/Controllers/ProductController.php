<?php

namespace App\Http\Controllers;

use App\Models\product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        return product::select('id', 'title', 'description', 'image')->get();
        // product::all();
        //product:get()
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'image' => 'required |image',
        ]);

        $imageName = uniqid().'.'.$request->image->extension();
        $request->image->move(public_path('images'), $imageName);

        // $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
        //Storage::disk('public')->putFileAs('images', $request->image, $imageName);
        product::create($request->post() + [
            'image' => $imageName,

            // 'user_id' => auth()->user()->id,
        ]);

        return response()->json([
            'message' => 'item aded successfully',
        ]);
    }

    public function show(product $product)
    {
        return response()->json([
            'products' => $product,
        ]);
    }

    public function update(Request $request, product $product)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'image' => 'nullable',
        ]);
        $product->fill($request->post())->update();
        if ($request->hasFile('image')) {
            // if ($product->image) {
            //     $exist = Storage::disk('public')->exists('images'.$product->image);
            //     if ($exist) {
            //         Storage::disk('public')->delete('images'.$product->image);
            //     }
            // }

            // $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
            // Storage::disk('public')->putFileAs('images', $request->image, $imageName);
            $imageName = uniqid().'.'.$request->image->extension();
            $request->image->move(public_path('images'), $imageName);

            $product->image = $imageName;
            $product->save();
        }

        return response()->json([
            'message' => 'item updated successfully',
        ]);
    }

    public function destroy(product $product)
    {
        // if ($product->image) {
        //     $exist = Storage::disk('public')->exists('images'.$product->image);
        //     if ($exist) {
        //         Storage::disk('public')->delete('images'.$product->image);
        //     }
        // }

        $product->delete();

        return response()->json([
            'message' => 'item deleted successfully',
        ]);
    }
}
